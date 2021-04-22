import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Story from '@components/organisms/Story/Story';
import useFindOne from '@gql/hooks/useFindOne';
import { UrlNameProps } from '@util/constants';
import { IApplication } from '@util/constants.entities';
import { communityIdVar } from '../../App.reactive';
import ApplicationChooseTypePage from './ApplicationChooseType';
import ApplicationConfirmationPage from './ApplicationConfirmation';
import ApplicationMainPage from './ApplicationMain';
import ApplicationReviewPage from './ApplicationReview';

const Application: React.FC = () => {
  const { urlName } = useParams() as UrlNameProps;

  const { data: application, error, loading } = useFindOne(IApplication, {
    fields: [
      'id',
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
    where: { community: { urlName } }
  });

  useEffect(() => {
    if (application.id) {
      communityIdVar(application.community.id);
    }
  }, [application]);

  if (error) return <Redirect to="/login" />;
  if (loading) return null;

  return (
    <div className="s-application-ctr">
      <Story>
        <ApplicationMainPage />
        <ApplicationChooseTypePage />
        <ApplicationReviewPage />
        <ApplicationConfirmationPage />
      </Story>
    </div>
  );
};

export default Application;
