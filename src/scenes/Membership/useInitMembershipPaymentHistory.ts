import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitMembershipPaymentHistory = (): QueryResult<IPayment[]> => {
  const result = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      'type',
      { member: ['id'] },
      { plan: ['id'] }
    ],
    operation: QueryEvent.GET_PAYMENTS,
    schema: [Schema.PAYMENT]
  });

  return result;
};

export default useInitMembershipPaymentHistory;
