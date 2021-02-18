import useQuery from '@hooks/useQuery';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitMemberPayments = (): boolean => {
  const { loading } = useQuery<IMemberPayment[]>({
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

  return loading;
};

export default useInitMemberPayments;
