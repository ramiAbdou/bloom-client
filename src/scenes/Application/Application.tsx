import React from 'react';
import { Redirect } from 'react-router-dom';

import Story from '@organisms/Story/Story';
import ApplicationChooseTypePage from './ApplicationChooseType';
import ApplicationConfirmationPage from './ApplicationConfirmation';
import ApplicationMainPage from './ApplicationMain';
import ApplicationReviewPage from './ApplicationReview';
import useInitApplication from './useInitApplication';

const Application: React.FC = () => {
  const { error, loading } = useInitApplication();

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
