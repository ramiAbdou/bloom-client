import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useInitPayments = (): QueryResult<IPayment[]> => {
  const result = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      { member: ['id'] },
      { plan: ['id'] }
    ],
    operation: 'getPayments',
    schema: [Schema.PAYMENT]
  });

  return result;
};

export default useInitPayments;
