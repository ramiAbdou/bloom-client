import { useEffect } from 'react';

import useHasuraLazyQuery from '@hooks/useHasuraLazyQuery';
import useManualQuery from '@hooks/useManualQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity, IMemberType, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitCommunity = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

  const [getCommunity, { loading: loading1 }] = useManualQuery<ICommunity>({
    fields: [
      'autoAccept',
      'id',
      'logoUrl',
      'name',
      'primaryColor',
      'urlName',
      { highlightedQuestion: ['id'] }
    ],
    operation: QueryEvent.GET_COMMUNITY,
    schema: Schema.COMMUNITY
  });

  const [getCommunityIntegrations, { loading: loading2 }] = useHasuraLazyQuery({
    fields: ['community.id', 'id', 'mailchimpListId', 'stripeAccountId'],
    operation: 'communityIntegrations',
    queryName: 'GetCommunityIntegrationsByCommunityId',
    schema: [Schema.COMMUNITY_INTEGRATIONS],
    variables: { communityId: { type: 'String!', value: communityId } },
    where: { community_id: { _eq: '$communityId' } }
  });

  const [getQuestions, { loading: loading3 }] = useManualQuery<IQuestion[]>({
    fields: [
      'category',
      'description',
      'id',
      'locked',
      'options',
      'rank',
      'required',
      'title',
      'type',
      { community: ['id'] }
    ],
    operation: QueryEvent.LIST_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const [listMemberTypes, { loading: loading4 }] = useManualQuery<
    IMemberType[]
  >({
    fields: [
      'amount',
      'id',
      'isFree',
      'name',
      'recurrence',
      { community: ['id'] }
    ],
    operation: QueryEvent.LIST_MEMBER_TYPES,
    schema: [Schema.MEMBER_TYPE]
  });

  useEffect(() => {
    if (!communityId) return;

    (async () => {
      await Promise.all([
        getCommunity(),
        getCommunityIntegrations(),
        getQuestions(),
        listMemberTypes()
      ]);
    })();
  }, [communityId]);

  const loading: boolean = loading1 || loading2 || loading3 || loading4;

  useLoader(loading);

  return { loading };
};

export default useInitCommunity;
