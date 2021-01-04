import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_INTEGRATIONS } from './Integrations.gql';

/**
 * Fetches the integrations configuration of a community and merges to the
 * React DB.
 */
const useFetchIntegrations = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data: community } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS
  });

  useEffect(() => {
    if (community) {
      mergeEntities({ data: community, schema: Schema.COMMUNITY });
    }
  }, [community]);
};

export default useFetchIntegrations;
