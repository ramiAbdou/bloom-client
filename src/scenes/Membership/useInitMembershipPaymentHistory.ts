import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitMembershipPaymentHistory = (): QueryResult<IPayment[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'stripeInvoiceUrl',
      'type',
      { member: ['id'] },
      { plan: ['id'] }
    ],
    operation: QueryEvent.GET_PAYMENTS,
    schema: [Schema.PAYMENT],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return result;
};

export default useInitMembershipPaymentHistory;
