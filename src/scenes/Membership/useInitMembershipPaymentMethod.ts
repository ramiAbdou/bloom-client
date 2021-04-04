import useBloomQuery from '@gql/useBloomQuery';
import { QueryResult } from '@gql/gql.types';
import { IMemberIntegrations } from '@store/db/Db.entities';
import { Schema } from '@store/db/Db.schema';
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
