import React from 'react';

import { ChildrenProps, isProduction } from '@constants';
import { useStoreState } from '@store/Store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Dues, { duesModel } from '../Dues.store';
import useFetchDuesInformation from '../hooks/useFetchDuesInformation';

const StripeProvider = ({ children }: ChildrenProps) => {
  const stripeAccount: string = useStoreState(({ db }) => {
    const { byId } = db.entities.integrations;
    return byId[db.community.integrations]?.stripeAccountId;
  });

  useFetchDuesInformation();

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

export default function DuesContainer({ children }: ChildrenProps) {
  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type]?.id;
  });

  if (!memberTypeId) return null;

  return (
    <Dues.Provider
      runtimeModel={{ ...duesModel, selectedTypeId: memberTypeId }}
    >
      <StripeProvider>{children}</StripeProvider>
    </Dues.Provider>
  );
}
