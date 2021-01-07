import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { IMemberPayment } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_DUES_HISTORY } from '../Analytics.gql';

const useFetchDuesHistory = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const result = useQuery<IMemberPayment[]>({
    name: 'getDuesHistory',
    query: GET_DUES_HISTORY
  });

  const { data } = result;

  useEffect(() => {
    if (data) mergeEntities({ data, schema: [Schema.MEMBER_PAYMENT] });
  }, [data]);

  return result;
};

export default useFetchDuesHistory;
