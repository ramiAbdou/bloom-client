import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitPaymentAnalyticsHistory = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IMember[]>({
    fields: [
      'email',
      'id',
      'firstName',
      'lastName',
      'payments.amount',
      'payments.community.id',
      'payments.createdAt',
      'payments.id',
      'payments.member.id',
      'payments.memberType.id',
      'payments.stripeInvoiceUrl'
    ],
    operation: 'members',
    queryName: 'GetMemberPaymentAnalytics',
    schema: [Schema.MEMBER],
    where: { communityId: { _eq: communityId } }
  });

  return result;
};

export default useInitPaymentAnalyticsHistory;
