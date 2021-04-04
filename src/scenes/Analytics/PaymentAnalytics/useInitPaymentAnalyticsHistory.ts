import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@db/db.entities';
import { Schema } from '@db/db.schema';
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
    schema: [Schema.MEMBER],
    where: { communityId }
  });

  return result;
};

export default useInitPaymentAnalyticsHistory;
