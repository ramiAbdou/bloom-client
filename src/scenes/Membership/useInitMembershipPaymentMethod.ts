import useBloomQuery from '@gql/useBloomQuery';
import { QueryResult } from '@gql/gql.types';
import { IMemberIntegrations } from '@db/db.entities';
import { Schema } from '@db/db.schema';
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
