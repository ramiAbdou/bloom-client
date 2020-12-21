import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DUES_INFORMATION } from '../Dues.gql';

export default function useFetchDuesInformation(): boolean {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data: community, loading } = useQuery<ICommunity>({
    name: 'getDuesInformation',
    query: GET_DUES_INFORMATION
  });

  useEffect(() => {
    if (community) {
      mergeEntities({ data: community, schema: Schema.COMMUNITY });
    }
  }, [community]);

  return loading;
}
