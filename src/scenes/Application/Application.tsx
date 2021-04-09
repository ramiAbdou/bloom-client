import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { IApplication } from '@db/db.entities';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import Story from '@organisms/Story/Story';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';
import ApplicationChooseTypePage from './ApplicationChooseType';
import ApplicationConfirmationPage from './ApplicationConfirmation';
import ApplicationMainPage from './ApplicationMain';
import ApplicationReviewPage from './ApplicationReview';

const Application: React.FC = () => {
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);
  const { urlName } = useParams() as UrlNameProps;

  const { data: application, error, loading } = useFindOneFull(IApplication, {
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
      setActiveEntities({ communityId: application.community.id });
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
