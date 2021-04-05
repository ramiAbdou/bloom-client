import React from 'react';

import Card from '@containers/Card/Card';
import StoryConfirmation from '@organisms/Story/StoryConfirmation';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';

const ApplicationConfirmationDefaultMessage: React.FC = () => {
  const name = useStoreState(({ db }) => db.community?.name);

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

const ApplicationConfirmationContent: React.FC = () => {
  const name = useStoreState(({ db }) => db.community?.name);

  if (!name) return null;
  return <ApplicationConfirmationDefaultMessage />;
};

const ApplicationConfirmation: React.FC = () => {
  const show: boolean = useStoreState(
    ({ db }) =>
      !!db.community?.questions?.length && !!db.community?.memberTypes?.length
  );

  return (
    <StoryPage
      className="s-application-ctr--confirmation"
      id="CONFIRMATION"
      show={!!show}
    >
      <Card>
        <StoryConfirmation title="Application Received">
          <ApplicationConfirmationContent />
        </StoryConfirmation>
      </Card>
    </StoryPage>
  );
};

export default ApplicationConfirmation;
