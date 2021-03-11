import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitMembershipPaymentMethod = () => {
  const result: QueryResult<IMemberIntegrations[]> = useQuery<
    IMemberIntegrations[]
  >({
    fields: [
      'id',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
    ],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: [Schema.MEMBER_INTEGRATIONS]
  });

  return result;
};

export default useInitMembershipPaymentMethod;
