import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
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

const ApplicationConfirmationAutoAcceptedMessage: React.FC = () => {
  const name = useStoreState(({ db }) => db.community?.name);
  const { push } = useHistory();
  const onClick = () => push('/login');

  return (
    <>
      <p>
        Congratulations, you've been accepted as a member of <span>{name}</span>
        ! You now have access to this platform.
      </p>

      <Button fill large secondary onClick={onClick}>
        Go to Login
      </Button>
    </>
  );
};

const ApplicationConfirmationContent: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);
  const name = useStoreState(({ db }) => db.community?.name);

  if (!name) return null;
  if (autoAccept) return <ApplicationConfirmationAutoAcceptedMessage />;
  return <ApplicationConfirmationDefaultMessage />;
};

const ApplicationConfirmation: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);
  const name = useStoreState(({ db }) => db.community?.name);

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
        <StoryConfirmation
          title={autoAccept ? `Welcome to ${name}` : 'Application Received'}
        >
          <ApplicationConfirmationContent />
        </StoryConfirmation>
      </Card>
    </StoryPage>
  );
};

export default ApplicationConfirmation;
