import React from 'react';

import { ICommunityIntegrations } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { isProduction } from '@util/constants';

const StripeProvider: React.FC = ({ children }) => {
  const stripeAccount: string = useStoreState(({ db }) => {
    const communityIntegrations: ICommunityIntegrations =
      db.byCommunityIntegrationsId[db.community.communityIntegrations];

    return communityIntegrations?.stripeAccountId;
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
