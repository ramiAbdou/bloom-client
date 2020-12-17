import { useMutation } from 'graphql-hooks';
import React, { FormEvent, useState } from 'react';

import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { isProduction, ModalType } from '@constants';
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
import { GET_PAYMENT_CLIENT_SECRET } from './Dues.gql';
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

const DuesModalContent = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const elements = useElements();
  const stripe = useStripe();

  const [getPaymentClientSecret] = useMutation(GET_PAYMENT_CLIENT_SECRET);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);
    setLoading(true);

    const { data, error } = await getPaymentClientSecret();

    if (error) {
      setErrorMessage(getGraphQLError(error));
      setLoading(false);
      return;
    }

    const clientSecret: string = data.getPaymentClientSecret;

    const { error: stripeError } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: elements.getElement(CardElement) } }
    );

    setLoading(false);

    if (stripeError) {
      setErrorMessage(stripeError.message);
      return;
    }

    showToast({ message: 'Your dues have been paid!' });
    setTimeout(closeModal, 0);
  };

  return (
    <Modal
      className="s-actions-dues"
      id={ModalType.PAY_DUES}
      onClose={() => setErrorMessage(null)}
    >
      <h1>Pay Dues</h1>
      <p>
        Once your card is charged, your membership will be active and will
        auto-renew on December 16th of every year. We’ll send you an email
        reminder 1 month before any auto-renewal.
      </p>

      <form onSubmit={onSubmit}>
        <DuesTypeOptions />

        <div className="s-actions-dues-item">
          <p>Credit or Debit Card</p>
          <CardElement options={options} />
        </div>

        <ErrorMessage message={errorMessage} />
        <PayButton loading={loading} />
      </form>
    </Modal>
  );
};

export default () => {
  const stripeAccount = useStoreState(({ db }) => {
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
      <DuesModalContent />
    </Elements>
  );
};
