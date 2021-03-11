import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import {
  ICommunityIntegrations,
  IMemberIntegrations
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitPayment = (): Partial<QueryResult> => {
  const {
    loading: loading1
  }: QueryResult<ICommunityIntegrations> = useQuery<ICommunityIntegrations>({
    fields: ['id', 'stripeAccountId', { community: ['id'] }],
    operation: QueryEvent.GET_COMMUNITY_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const { loading: loading2 }: QueryResult<IMemberIntegrations[]> = useQuery<
    IMemberIntegrations[]
  >({
    fields: [
      'id',
      'stripeSubscriptionId',
      { member: ['id'] },
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
    ],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: [Schema.MEMBER_INTEGRATIONS]
  });

  return { loading: loading1 || loading2 };
};

export default useInitPayment;
