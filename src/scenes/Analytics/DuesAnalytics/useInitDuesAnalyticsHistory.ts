import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitDuesAnalyticsHistory = () => {
  const result: QueryResult<IMemberPayment[]> = useQuery<IMemberPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      { community: ['id'] },
      {
        member: [
          'id',
          'isDuesActive',
          { user: ['id', 'firstName', 'lastName', 'email'] }
        ]
      },
      { type: ['id'] }
    ],
    operation: 'getPayments',
    schema: [Schema.MEMBER_PAYMENT]
  });

  return result;
};

export default useInitDuesAnalyticsHistory;
