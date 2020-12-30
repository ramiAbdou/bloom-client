import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/entities';
import Loading from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DATABASE } from '../Database.gql';

export default function useFetchDatabase() {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  const { data: community, loading } = useQuery<ICommunity>({
    name: 'getDatabase',
    query: GET_DATABASE
  });

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (!community) return;

    // After fetching the member database, we update both the members AND
    // the member questions.
    mergeEntities({ data: community, schema: Schema.COMMUNITY });
  }, [community]);
}
