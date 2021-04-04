import { IMemberIntegrations } from '@db/db.entities';
import { Schema } from '@db/db.schema';
import { QueryResult } from '@gql/gql.types';
import useBloomQuery from '@gql/useBloomQuery';
import { QueryEvent } from '@util/constants.events';

const useInitMembershipRenewal = (): QueryResult<IMemberIntegrations[]> => {
  const result: QueryResult<IMemberIntegrations[]> = useBloomQuery<
    IMemberIntegrations[]
  >({
    fields: ['id', 'renewalDate'],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: Schema.MEMBER_INTEGRATIONS
  });

  return result;
};

export default useInitMembershipRenewal;
