import { useEffect } from 'react';

import { ICommunity } from '@db/db.entities';
import { Schema } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useLazyQuery from '@gql/useLazyQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreState } from '@store/Store';

const useInitCommunity = (): QueryResult<ICommunity[]> => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

  const [getCommunity, result] = useLazyQuery<ICommunity[]>({
    fields: [
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
    schema: [Schema.COMMUNITY],
    where: { id: communityId }
  });

  useEffect(() => {
    if (communityId) getCommunity();
  }, [communityId]);

  useLoader(result.loading);

  return result;
};

export default useInitCommunity;
