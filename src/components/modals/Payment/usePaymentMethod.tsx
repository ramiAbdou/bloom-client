import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import useUpdateLoading from '@hooks/useUpdateLoading';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_PAYMENT_METHOD } from './Payment.gql';

const usePaymentMethod = (skipGlobalLoadingState?: boolean) => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, loading } = useQuery<IMember>({
    name: 'getMember',
    query: GET_PAYMENT_METHOD
  });

  useUpdateLoading(skipGlobalLoadingState ? undefined : loading);

  useEffect(() => {
    if (data) mergeEntities({ data, schema: Schema.MEMBER });
  }, [data]);

  return loading;
};

export default usePaymentMethod;
