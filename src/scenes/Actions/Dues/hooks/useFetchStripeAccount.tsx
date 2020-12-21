import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_STRIPE_ACCOUNT_ID } from '../Dues.gql';

export default () => {
  const community = useStoreState(({ db }) => db.community);
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);

  const { data: stripeAccountId, loading } = useQuery<string>({
    name: 'getStripeAccountId',
    query: GET_STRIPE_ACCOUNT_ID
  });

  useEffect(() => {
    if (!stripeAccountId) return;

    updateEntities({
      entityName: 'integrations',
      ids: [community.integrations],
      updatedData: { stripeAccountId }
    });
  }, [stripeAccountId]);

  return loading;
};
