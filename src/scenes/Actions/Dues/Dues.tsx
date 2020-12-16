import React from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import Modal from '@components/Modal/Modal';
import { isProduction, ModalType } from '@constants';
import {
  CardElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardNumberInput from './CardNumber';

const DuesModalContent = () => {
  const elements = useElements();
  const stripe = useStripe();

  const onSubmit = async () => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      card: elements.getElement(CardNumberElement),
      type: 'card'
    });
  };

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES}>
      <h1>Pay Dues</h1>

      <p>
        Once you're card is charged, your membership will be valid for 1 year
        until December 16, 2020.
      </p>

      <div id="s-actions-dues-card-num" />
      <CardNumberInput />
      <PrimaryButton large disabled={!stripe} title="Pay" onClick={onSubmit} />
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
