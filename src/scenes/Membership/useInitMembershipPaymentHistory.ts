import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
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
    schema: [Schema.PAYMENT],
    where: { memberId }
  });

  return result;
};

export default useInitMembershipPaymentHistory;
