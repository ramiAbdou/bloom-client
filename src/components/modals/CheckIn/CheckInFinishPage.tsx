import deline from 'deline';
import React from 'react';

import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import CheckInGuestForm from './CheckInGuestForm';
import CheckInLoginContent from './CheckInLoginContent';

const CheckInFinishPage: React.FC = () => {
  const branchId = StoryStore.useStoreState(({ getPage }) => {
    return getPage('FINISH')?.branchId;
  });

  return (
    <StoryPage
      branchId="FINISH_GUEST"
      branches={{
        FINISH_GUEST: {
          description: deline`
            We'll send you an email with a link to join the event 30 minutes
            before the event's start time.
          `,
          title: 'Finish Checking-In'
        },
        FINISH_MEMBER: { title: 'Sign In to Continue' }
      }}
      id="FINISH"
    >
      <CheckInLoginContent show={branchId === 'FINISH_MEMBER'} />
      <CheckInGuestForm show={branchId === 'FINISH_GUEST'} />
    </StoryPage>
  );
};

export default CheckInFinishPage;
