import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DIRECTORY } from './Directory.gql';
import Directory from './Directory.store';

export default function useFetchDirectory() {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Directory.useStoreState((store) => store.loading);
  const setLoading = Directory.useStoreActions((store) => store.setLoading);

  const { data: community, loading } = useQuery<ICommunity>({
    name: 'getDirectory',
    query: GET_DIRECTORY
  });

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (community) {
      mergeEntities({ data: community, schema: Schema.COMMUNITY });
    }
  }, [community]);
}
