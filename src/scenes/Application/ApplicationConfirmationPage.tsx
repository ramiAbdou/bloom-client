import React from 'react';

import StoryPage from '@components/organisms/Story/StoryPage';
import ApplicationConfirmationPageCard from './ApplicationConfirmationPageCard';

const ApplicationConfirmationPage: React.FC = () => (
  <StoryPage className="s-application-ctr--confirmation" id="CONFIRMATION">
    <ApplicationConfirmationPageCard />
  </StoryPage>
);

export default ApplicationConfirmationPage;
