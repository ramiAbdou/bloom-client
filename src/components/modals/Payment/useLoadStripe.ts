import { useEffect, useState } from 'react';

import { useStoreState } from '@store/Store';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const useLoadStripe = (): Stripe => {
  const [stripe, setStripe] = useState<Stripe>(null);

  const stripeAccountId: string = useStoreState(({ db }) => {
    return db.communityIntegrations?.stripeAccountId;
  });

  useEffect(() => {
    // Don't try to load Stripe unless we have the ID of the Stripe account
    // that we want to connect to.
    if (!stripeAccountId) return;

    (async () => {
      const result: Stripe = await loadStripe(
        process.env.STRIPE_PUBLISHABLE_KEY,
        { stripeAccount: stripeAccountId }
      );

      // If Stripe loaded successfully, then update the state so that we can
      // render the Elements object.
      if (result) setStripe(result);
    })();
  }, [stripeAccountId]);

  return stripe;
};

export default useLoadStripe;
