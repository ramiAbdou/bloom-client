import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import useUpdateLoading from '@hooks/useUpdateLoading';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DIRECTORY } from './Directory.gql';

export default function useFetchDirectory() {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data: community, loading } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY
  });

  useUpdateLoading(loading);

  useEffect(() => {
    if (community) {
      mergeEntities({ data: community, schema: Schema.COMMUNITY });
    }
  }, [community]);
}
