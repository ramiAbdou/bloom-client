import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitMemberPayments = (): QueryResult<IMemberPayment[]> => {
  const result = useQuery<IMemberPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      { member: ['id'] },
      { type: ['id'] }
    ],
    operation: 'getMemberPayments',
    schema: [Schema.MEMBER_PAYMENT]
  });

  return result;
};

export default useInitMemberPayments;
