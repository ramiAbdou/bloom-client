import useHasuraQuery from '@hooks/useHasuraQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import {
  ICommunityIntegrations,
  IMemberIntegrations
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitPayment = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 } = useHasuraQuery<ICommunityIntegrations[]>({
    fields: ['id', 'community.id', 'stripeAccountId'],
    operation: 'communityIntegrations',
    queryName: 'GetCommunityIntegrationsByCommunityId',
    schema: [Schema.COMMUNITY_INTEGRATIONS],
    variables: { communityId: { type: 'String!', value: communityId } },
    where: { community_id: { _eq: '$communityId' } }
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
    schema: Schema.MEMBER_INTEGRATIONS
  });

  return { loading: loading1 || loading2 };
};

export default useInitPayment;
