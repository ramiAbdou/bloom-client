import { useMutation } from 'graphql-hooks';
import React, { FormEvent, useState } from 'react';

import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { isProduction, ModalType } from '@constants';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js';
import { getGraphQLError, uuid } from '@util/util';
import { CHARGE_PAYMENT } from './Dues.gql';
import PayButton from './PayButton';

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
  const [errorMessage, setErrorMessage] = useState(null);

  const elements = useElements();
  const stripe = useStripe();

  const [chargePayment, { loading }] = useMutation(CHARGE_PAYMENT);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      card: elements.getElement(CardElement),
      type: 'card'
    });

    console.log(paymentMethod);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const { id } = paymentMethod;

    const { error: gqlError } = await chargePayment({
      variables: { id, idempotencyKey: uuid() }
    });

    if (gqlError) {
      const message = getGraphQLError(gqlError);
      setErrorMessage(message);
    }
  };

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES}>
      <h1>Pay Dues</h1>
      <p>
        Once you're card is charged, your membership will be valid for 1 year
        until December 16, 2020.
      </p>

      <form onSubmit={onSubmit}>
        <p className="meta">Payment Information</p>
        <CardElement options={options} />
        <ErrorMessage message={errorMessage} />
        <PayButton loading={loading} />
      </form>
    </Modal>
  );
};

export default () => {
  const stripePromise = loadStripe(
    isProduction
      ? process.env.STRIPE_PUBLISHABLE_KEY
      : process.env.STRIPE_TEST_PUBLISHABLE_KEY
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
