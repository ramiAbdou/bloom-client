import React from 'react';

import { isProduction } from '@constants';
import { useStoreState } from '@store/Store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const StripeProvider: React.FC = ({ children }) => {
  const stripeAccount: string = useStoreState(({ db }) => {
    const { byId } = db.entities.integrations;
    return byId[db.community.integrations]?.stripeAccountId;
  });

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
      {children}
    </Elements>
  );
};

export default StripeProvider;
