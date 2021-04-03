import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitMembershipPaymentHistory = (): QueryResult<IPayment[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'member.id',
      'memberType.id',
      'stripeInvoiceUrl',
      'type'
    ],
    operation: 'payments',
    queryName: 'GetPaymentsByMemberId',
    schema: [Schema.PAYMENT],
    variables: { memberId: { type: 'String!', value: memberId } },
    where: { member_id: { _eq: '$memberId' } }
  });

  return result;
};

export default useInitMembershipPaymentHistory;
