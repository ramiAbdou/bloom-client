import { useQuery } from 'graphql-hooks';
import { useEffect } from 'react';

import { useStoreActions, useStoreState } from '@store/Store';
import { GET_STRIPE_ACCOUNT_ID } from '../Dues.gql';

export default () => {
  const community = useStoreState(({ db }) => db.community);
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);

  const { data, loading } = useQuery(GET_STRIPE_ACCOUNT_ID);

  useEffect(() => {
    const stripeAccountId = data?.getStripeAccountId;
    if (!stripeAccountId) return;

    updateEntities({
      entityName: 'integrations',
      ids: [community.integrations],
      updatedData: { stripeAccountId }
    });
  }, [data]);

  return loading;
};
