import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
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
        Congratulations, you've been accepted into the <span>{name}</span>
        community! We just sent a login link to your email.
      </p>

      <Button fill secondary onClick={onClick}>
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

  return (
    <div className="s-application-ctr--confirmation">
      <Card>
        <ConfirmationScreen
          title={autoAccept ? 'Application Accepted' : 'Application Received'}
        >
          <ApplicationConfirmationContent />
        </ConfirmationScreen>
      </Card>
    </div>
  );
};

export default ApplicationConfirmation;
