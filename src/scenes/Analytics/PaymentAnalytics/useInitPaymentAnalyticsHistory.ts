import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember, IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitPaymentAnalyticsHistory = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { data, loading: loading1 }: QueryResult<IPayment[]> = useQuery<
    IPayment[]
  >({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      { community: ['id'] },
      { member: ['id'] },
      { plan: ['id'] }
    ],
    operation: QueryEvent.LIST_PAYMENTS,
    schema: [Schema.PAYMENT],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  const { loading: loading2 }: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: ['email', 'id', 'isDuesActive', 'firstName', 'lastName'],
    operation: QueryEvent.LIST_MEMBERS,
    schema: [Schema.MEMBER],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return { data, loading: loading1 || loading2 };
};

export default useInitPaymentAnalyticsHistory;
