import React from 'react';

import StoryStore from '@organisms/Story/Story.store';
import StoryPage from '@organisms/Story/StoryPage';
import CheckInGuestForm from './CheckInGuestForm';
import CheckInLoginContent from './CheckInLoginContent';

const CheckInFinishPage: React.FC = () => {
  const page = StoryStore.useStoreState(({ getPage }) => getPage('FINISH'));
  const branchId = page?.branchId;

  return (
    <StoryPage
      branchId="FINISH_MEMBER"
      branches={{
        FINISH_GUEST: { title: 'Finish Checking-In' },
        FINISH_MEMBER: { title: 'Finish Checking-In' }
      }}
      id="FINISH"
    >
      <CheckInLoginContent show={branchId === 'FINISH_MEMBER'} />
      <CheckInGuestForm show={branchId === 'FINISH_GUEST'} />
    </StoryPage>
  );
};

export default CheckInFinishPage;
