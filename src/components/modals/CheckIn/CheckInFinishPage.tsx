import deline from 'deline';
import React from 'react';

import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import CheckInGuestForm from './CheckInGuestForm';
import CheckInLoginContent from './CheckInLoginContent';

interface CheckInFinishPageProps {
  lock?: boolean;
}

const CheckInFinishPage: React.FC<CheckInFinishPageProps> = ({ lock }) => {
  const branchId = StoryStore.useStoreState(({ getPage }) => {
    return getPage('FINISH')?.branchId;
  });

  return (
    <StoryPage
      branchId="FINISH_MEMBER"
      branches={{
        FINISH_GUEST: {
          description: deline`
            We'll send you an email with a link to join the event 30 minutes
            before the event's start time.
          `,
          title: 'Finish Checking-In'
        },
        FINISH_MEMBER: {
          description:
            lock &&
            'You need to be a member to view this event. Sign in to continue.',
          title: 'Sign In to Continue'
        }
      }}
      id="FINISH"
    >
      <CheckInLoginContent show={branchId === 'FINISH_MEMBER'} />
      <CheckInGuestForm show={branchId === 'FINISH_GUEST'} />
    </StoryPage>
  );
};

export default CheckInFinishPage;
