import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitPaymentAnalyticsHistory = () => {
  const result: QueryResult<IPayment[]> = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      { community: ['id'] },
      { member: ['email', 'id', 'isDuesActive', 'firstName', 'lastName'] },
      { plan: ['id'] }
    ],
    operation: 'getAllPayments',
    schema: [Schema.PAYMENT]
  });

  return result;
};

export default useInitPaymentAnalyticsHistory;
