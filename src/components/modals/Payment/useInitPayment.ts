import { QueryResult } from '@gql/gql.types';
import useBloomQuery from '@gql/useBloomQuery';
import useQuery from '@gql/useQuery';
import {
  ICommunityIntegrations,
  IMemberIntegrations
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitPayment = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 } = useQuery<ICommunityIntegrations[]>({
    fields: ['id', 'community.id', 'stripeAccountId'],
    operation: 'communityIntegrations',
    queryName: 'GetCommunityIntegrationsByCommunityId',
    schema: [Schema.COMMUNITY_INTEGRATIONS],
    where: { communityId }
  });

  const {
    loading: loading2
  }: QueryResult<IMemberIntegrations[]> = useBloomQuery<IMemberIntegrations[]>({
    fields: [
      'id',
      'stripeSubscriptionId',
      { member: ['id'] },
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
    ],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: Schema.MEMBER_INTEGRATIONS
  });

  return { loading: loading1 || loading2 };
};

export default useInitPayment;
