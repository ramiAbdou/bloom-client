import React from 'react';

import Story from '@organisms/Story/Story';
import { useStoreState } from '@store/Store';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInMainPage from './CheckInMainPage';

const CheckInModal: React.FC = () => {
  const isMembersOnly = useStoreState(({ db }) => db.event?.private);
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const lock = isMembersOnly && !isAuthenticated;

  return (
    <Story>
      <CheckInChoosePage show={!lock} />
      <CheckInMainPage lock={lock} />
      <CheckInConfirmation />
    </Story>
  );
};

export default CheckInModal;
