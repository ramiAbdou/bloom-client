import React, { useEffect, useState } from 'react';

import { useStoreState } from '@store/Store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const PaymentStripeProvider: React.FC = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe>(null);

  const stripeAccountId: string = useStoreState(({ db }) => {
    return db.communityIntegrations?.stripeAccountId;
  });

  useEffect(() => {
    if (!stripeAccountId) return;

    (async () => {
      const result: Stripe = await loadStripe(
        process.env.STRIPE_PUBLISHABLE_KEY,
        { stripeAccount: stripeAccountId }
      );

      if (result) setStripe(result);
    })();
  }, [stripeAccountId]);

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
