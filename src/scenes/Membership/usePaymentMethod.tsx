import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { GET_PAYMENT_METHOD } from './Membership.gql';

const usePaymentMethod = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const result = useQuery<IMember>({
    name: 'getMember',
    query: GET_PAYMENT_METHOD
  });

  useEffect(() => {
    if (!result?.data) return;
    mergeEntities({ data: result.data, schema: Schema.MEMBER });
  }, [result.data]);

  return result;
};

export default usePaymentMethod;
