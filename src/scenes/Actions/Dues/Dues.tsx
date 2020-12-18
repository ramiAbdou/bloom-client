import day from 'dayjs';
import { useMutation } from 'graphql-hooks';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { isProduction, ModalType } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js';
import { getGraphQLError } from '@util/util';
import PayButton from './components/PayButton';
import DuesTypeOptions from './components/TypeOptions';
import { CONFIRM_PAYMENT_INTENT, CREATE_PAYMENT_INTENT } from './Dues.gql';
import Dues from './Dues.store';
import useFetchStripeAccount from './hooks/useFetchStripeAccount';

const options: StripeCardElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus',
    invalid: 'c-misc-input--error'
  },
  iconStyle: 'solid',
  style: { base: { fontFamily: 'Muli', fontSize: '15px', fontWeight: '700' } }
};

const DuesText = () => {
  const currentTypeId: string = Dues.useStoreState(
    (store) => store.memberTypeId
  );

  const recurrence = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[currentTypeId]?.recurrence;
  });

  const isFree = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[currentTypeId]?.isFree;
  });

  if (isFree) {
    return (
      <p>
        There are no dues to pay for a free membership! If you'd like to switch
        to a free membership, please do that in{' '}
        <Link style={{ fontWeight: 700 }} to="/manage-membership">
          Manage Membership
        </Link>
        .
      </p>
    );
  }

  if (recurrence === 'LIFETIME') {
    return (
      <p>
        Once your card is charged, you will be an active member for the rest of
        your life!
      </p>
    );
  }

  return (
    <p>
      Once your card is charged, your membership will be active and will
      auto-renew on {day().format('MMMM D')} of every year. We’ll send you an
      email reminder 1 month before any auto-renewal.
    </p>
  );
};

const DuesModalContent = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type]?.id;
  });

  const currentTypeId: string = Dues.useStoreState(
    (store) => store.memberTypeId
  );

  const setMemberTypeId = Dues.useStoreActions(
    (store) => store.setMemberTypeId
  );

  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[currentTypeId]?.isFree;
  });

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (currentTypeId !== memberTypeId) setMemberTypeId(memberTypeId);
  }, [memberTypeId]);

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [confirmPaymentIntent] = useMutation(CONFIRM_PAYMENT_INTENT);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);
    setLoading(true);

    const { data, error } = await createPaymentIntent({
      variables: { memberTypeId: currentTypeId }
    });

    if (error) {
      setErrorMessage(getGraphQLError(error));
      setLoading(false);
      return;
    }

    const clientSecret: string = data.createPaymentIntent;

    const {
      error: stripeError,
      paymentIntent
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    setLoading(false);

    if (stripeError) {
      setErrorMessage(stripeError.message);
      return;
    }

    const { data: confirmData } = await confirmPaymentIntent({
      variables: { paymentIntentId: paymentIntent.id }
    });

    mergeEntities({
      data: confirmData?.confirmPaymentIntent,
      schema: Schema.MEMBER
    });

    showToast({ message: 'Your dues have been paid!' });
    setTimeout(closeModal, 0);
  };

  const onClose = () => setErrorMessage(null);

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES} onClose={onClose}>
      <h1>Pay Dues</h1>
      <DuesText />

      <form onSubmit={onSubmit}>
        <DuesTypeOptions />

        {!isFree && (
          <div className="s-actions-dues-item">
            <p>Credit or Debit Card</p>
            <CardElement options={options} />
          </div>
        )}

        <ErrorMessage message={errorMessage} />
        <PayButton loading={loading} />
      </form>
    </Modal>
  );
};

export default () => {
  const stripeAccount: string = useStoreState(({ db }) => {
    const { byId } = db.entities.integrations;
    return byId[db.community.integrations]?.stripeAccountId;
  });

  useFetchStripeAccount();

  if (!stripeAccount) return null;

  const stripePromise = loadStripe(
    isProduction
      ? process.env.STRIPE_PUBLISHABLE_KEY
      : process.env.STRIPE_TEST_PUBLISHABLE_KEY,
    { stripeAccount }
  );

  return (
    <Elements
      options={{
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Muli' }]
      }}
      stripe={stripePromise}
    >
      <Dues.Provider>
        <DuesModalContent />
      </Dues.Provider>
    </Elements>
  );
};
