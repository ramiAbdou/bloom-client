import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHasuraQuery from '@hooks/useHasuraQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';

const useInitApplication = (): Pick<QueryResult, 'error' | 'loading'> => {
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);
  const { urlName } = useParams() as UrlNameProps;

  const { error, loading, data } = useHasuraQuery({
    fields: [
      'id',
      'communityId',
      'community.autoAccept',
      'community.id',
      'community.logoUrl',
      'community.name',
      'community.primaryColor',
      'community.urlName',
      'community.communityIntegration.id',
      'community.communityIntegration.communityId',
      'community.communityIntegration.stripeAccountId',
      'community.memberTypes.amount',
      'community.memberTypes.id',
      'community.memberTypes.name',
      'community.memberTypes.recurrence',
      'description',
      'rankedQuestions.id',
      'rankedQuestions.rank',
      'rankedQuestions.application.id',
      'rankedQuestions.question.category',
      'rankedQuestions.question.description',
      'rankedQuestions.question.id',
      'rankedQuestions.question.options',
      'rankedQuestions.question.required',
      'rankedQuestions.question.title',
      'rankedQuestions.question.type',
      'rankedQuestions.question.community.id',
      'title'
    ],
    operation: 'applications',
    queryName: 'GetApplicationByUrlName',
    schema: [Schema.APPLICATION],
    variables: { urlName: { type: 'String!', value: urlName } },
    where: { community: { url_name: { _eq: '$urlName' } } }
  });

  useEffect(() => {
    if (!data) return;

    setActiveEntities({
      id: data.applications[0].community.id,
      table: 'communities'
    });
  }, [data]);

  return { error, loading };
};

export default useInitApplication;
