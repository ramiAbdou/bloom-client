import useBloomQuery from '@hooks/useBloomQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/constants.events';

const useInitMembershipPaymentMethod = (): QueryResult<
  IMemberIntegrations[]
> => {
  const result: QueryResult<IMemberIntegrations[]> = useBloomQuery<
    IMemberIntegrations[]
  >({
    fields: [
      'id',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
    ],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: Schema.MEMBER_INTEGRATIONS
  });

  return result;
};

export default useInitMembershipPaymentMethod;
