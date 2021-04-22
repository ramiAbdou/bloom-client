import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import StoryConfirmation from '@components/organisms/Story/StoryConfirmation';
import StoryPage from '@components/organisms/Story/StoryPage';
import useFindOne from '@gql/hooks/useFindOne';
import { ICommunity } from '@util/db.entities';

const ApplicationConfirmationMessage: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  if (loading) return null;

  return (
    <>
      <p>
        Your application to {community.name} was received! When you are accepted
        into the community, we'll send you an email notification.
      </p>

      <p>You may now close this page.</p>
    </>
  );
};

const ApplicationConfirmation: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['memberTypes.id', 'questions.id'],
    where: { id: communityId }
  });

  if (loading) return null;

  return (
    <StoryPage
      className="s-application-ctr--confirmation"
      id="CONFIRMATION"
      show={!!community.memberTypes?.length && !!community.questions?.length}
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
