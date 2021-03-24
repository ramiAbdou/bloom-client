import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import useLoadStripe from './useLoadStripe';

const PaymentStripeProvider: React.FC = ({ children }) => {
  const stripe: Stripe = useLoadStripe();

  // We don't even render the children until the Stripe object has been loaded,
  // and this ensures that when we submit a payment it will reach Stripe.
  if (!stripe) return null;

  return (
    <Elements
      options={{
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Muli' }]
      }}
      stripe={stripe}
    >
      {children}
    </Elements>
  );
};

export default PaymentStripeProvider;
