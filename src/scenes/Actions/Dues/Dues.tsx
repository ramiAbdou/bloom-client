import day from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { isProduction, ModalType } from '@constants';
import { useStoreState } from '@store/Store';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js';
import PayButton from './components/PayButton';
import DuesTypeOptions from './components/TypeOptions';
import Dues, { duesModel } from './Dues.store';
import useCreateSubscription from './hooks/useCreateSubscription';
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
  const currentTypeId: string = Dues.useStoreState(
    (store) => store.memberTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[currentTypeId]?.isFree;
  });

  const createSubscription = useCreateSubscription();

  return (
    <Modal id={ModalType.PAY_DUES}>
      <Form className="s-actions-dues" onSubmit={createSubscription}>
        <h1>Pay Dues</h1>
        <DuesText />
        <DuesTypeOptions />

        {!isFree && (
          <div className="s-actions-dues-item">
            <p>Credit or Debit Card</p>
            <CardElement options={options} />
          </div>
        )}

        <FormErrorMessage />
        <PayButton />
      </Form>
    </Modal>
  );
};

export default () => {
  const stripeAccount: string = useStoreState(({ db }) => {
    const { byId } = db.entities.integrations;
    return byId[db.community.integrations]?.stripeAccountId;
  });

  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type]?.id;
  });

  useFetchStripeAccount();

  if (!stripeAccount || !memberTypeId) return null;

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
      <Dues.Provider runtimeModel={{ ...duesModel, memberTypeId }}>
        <DuesModalContent />
      </Dues.Provider>
    </Elements>
  );
};
