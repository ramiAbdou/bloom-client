import React from 'react';

import Card from '@components/containers/Card/Card';
import StoryConfirmation from '@components/organisms/Story/StoryConfirmation';
import useCommunityName from '@core/hooks/useCommunityName';

const ApplicationConfirmationPageCardMessage: React.FC = () => {
  const name: string = useCommunityName();

  return (
    <>
      <p>
        Your application to {name} was received! When you are accepted into the
        community, we'll send you an email notification.
      </p>

      <p>You may now close this page.</p>
    </>
  );
};

const ApplicationConfirmationPageCard: React.FC = () => (
  <Card>
    <StoryConfirmation title="Application Received">
      <ApplicationConfirmationPageCardMessage />
    </StoryConfirmation>
  </Card>
);

export default ApplicationConfirmationPageCard;
