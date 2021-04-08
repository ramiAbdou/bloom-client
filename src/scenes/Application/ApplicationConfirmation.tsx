import React from 'react';

import Card from '@containers/Card/Card';
import { ICommunity } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import StoryConfirmation from '@organisms/Story/StoryConfirmation';
import StoryPage from '@organisms/Story/StoryPage';
import { useStoreState } from '@store/Store';

const ApplicationConfirmationMessage: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

  const { name } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

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

const ApplicationConfirmation: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

  const { memberTypes, questions } = useFindOne(ICommunity, {
    fields: ['memberTypes.id', 'questions.id'],
    where: { id: communityId }
  });

  return (
    <StoryPage
      className="s-application-ctr--confirmation"
      id="CONFIRMATION"
      show={!!memberTypes?.length && !!questions?.length}
    >
      <Card>
        <StoryConfirmation title="Application Received">
          <ApplicationConfirmationMessage />
        </StoryConfirmation>
      </Card>
    </StoryPage>
  );
};

export default ApplicationConfirmation;
