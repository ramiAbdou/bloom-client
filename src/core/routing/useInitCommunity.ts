import { useEffect } from 'react';

import useHasuraLazyQuery from '@hooks/useHasuraLazyQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitCommunity = (): QueryResult<ICommunity[]> => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

  const [getCommunity, result] = useHasuraLazyQuery<ICommunity[]>({
    fields: [
      'autoAccept',
      'communityIntegrations.community.id',
      'communityIntegrations.id',
      'communityIntegrations.stripeAccountId',
      'highlightedQuestion.id',
      'id',
      'logoUrl',
      'memberTypes.amount',
      'memberTypes.community.id',
      'memberTypes.id',
      'memberTypes.name',
      'memberTypes.recurrence',
      'name',
      'primaryColor',
      'questions.category',
      'questions.community.id',
      'questions.description',
      'questions.id',
      'questions.locked',
      'questions.options',
      'questions.rank',
      'questions.required',
      'questions.title',
      'questions.type',
      'urlName'
    ],
    operation: 'communities',
    queryName: 'GetCommunityById',
    schema: [Schema.COMMUNITY],
    variables: { communityId: { type: 'String!', value: communityId } },
    where: { id: { _eq: '$communityId' } }
  });

  useEffect(() => {
    if (communityId) getCommunity();
  }, [communityId]);

  useLoader(result.loading);

  return result;
};

export default useInitCommunity;
