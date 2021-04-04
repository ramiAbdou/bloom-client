import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IApplication } from '@db/db.entities';
import { Schema } from '@db/db.schema';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
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
      'community.communityIntegrations.id',
      'community.communityIntegrations.communityId',
      'community.communityIntegrations.stripeAccountId',
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

  console.log(error, applications);

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
