import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

const useInitPaymentAnalyticsHistory = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

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
    operation: QueryEvent.GET_PAYMENTS,
    schema: [Schema.PAYMENT],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return result;
};

export default useInitPaymentAnalyticsHistory;
