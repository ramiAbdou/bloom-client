import React from 'react';

import { useStoreState } from '@store/Store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const PaymentStripeProvider: React.FC = ({ children }) => {
  const stripeAccountId: string = useStoreState(({ db }) => {
    return db.communityIntegrations?.stripeAccountId;
  });

  if (!stripeAccountId) return null;

  const stripePromise: Promise<Stripe> = loadStripe(
    process.env.STRIPE_PUBLISHABLE_KEY,
    { stripeAccount: stripeAccountId }
  );

  return (
    <Elements
      options={{
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Muli' }]
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
};

export default PaymentStripeProvider;
