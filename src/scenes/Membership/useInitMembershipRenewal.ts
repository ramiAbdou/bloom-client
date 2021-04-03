import useBloomQuery from '@gql/useBloomQuery';
import { QueryResult } from '@gql/useQuery.types';
import { IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
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
