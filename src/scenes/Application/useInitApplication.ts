import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IApplication } from '@db/Db.entities';
import { Schema } from '@db/Db.schema';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';

const useInitApplication = (): Pick<QueryResult, 'error' | 'loading'> => {
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);
  const { urlName } = useParams() as UrlNameProps;

  const { error, loading, data: applications } = useQuery<IApplication[]>({
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
    schema: [Schema.APPLICATION],
    where: { community: { urlName } }
  });

  useEffect(() => {
    if (!applications) return;

    setActiveEntities({
      id: applications[0].communityId,
      table: 'communities'
    });
  }, [applications]);

  return { error, loading };
};

export default useInitApplication;
