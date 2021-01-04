import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import useUpdateLoading from '@hooks/useUpdateLoading';
import { GET_DATABASE } from '@scenes/Database/Database.gql';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';

const useFetchDatabase = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data: community, loading } = useQuery<ICommunity>({
    name: 'getDatabase',
    query: GET_DATABASE
  });

  useUpdateLoading(loading);

  useEffect(() => {
    if (!community) return;

    // After fetching the member database, we update both the members AND
    // the member questions.
    mergeEntities({ data: community, schema: Schema.COMMUNITY });
  }, [community]);
};

export default useFetchDatabase;
