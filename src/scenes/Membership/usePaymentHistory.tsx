import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import useUpdateLoading from '@hooks/useUpdateLoading';
import { IMemberPayment } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_PAYMENT_HISTORY } from './Membership.gql';

const usePaymentHistory = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, loading } = useQuery<IMemberPayment[]>({
    name: 'getPaymentHistory',
    query: GET_PAYMENT_HISTORY
  });

  useUpdateLoading(loading);

  useEffect(() => {
    if (data) mergeEntities({ data, schema: [Schema.MEMBER_PAYMENT] });
  }, [data]);
};

export default usePaymentHistory;
