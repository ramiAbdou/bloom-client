import { useEffect } from 'react';

import useQuery from '@hooks/useQuery';
import { IPaymentMethod } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PAYMENT_METHOD } from '../Membership.gql';

const usePaymentMethod = () => {
  const memberId = useStoreState(({ db }) => db.member.id);
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);

  const result = useQuery<IPaymentMethod>({
    name: 'getPaymentMethod',
    query: GET_PAYMENT_METHOD
  });

  useEffect(() => {
    if (!result?.data) return;

    updateEntities({
      entityName: 'members',
      ids: [memberId],
      updatedData: { paymentMethod: result.data }
    });
  }, [result.data]);

  return result;
};

export default usePaymentMethod;
