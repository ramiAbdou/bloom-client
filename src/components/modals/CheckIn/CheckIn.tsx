import React from 'react';

import Story from '@organisms/Story/Story';
import { EventPrivacy } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInMainPage from './CheckInMainPage';

const CheckInModal: React.FC = () => {
  const lock: boolean = useStoreState(({ db }) => {
    const isMembersOnly: boolean =
      db.event?.privacy === EventPrivacy.MEMBERS_ONLY;

    return isMembersOnly && !db.isMember;
  });

  return (
    <Story>
      <CheckInChoosePage show={!lock} />
      <CheckInMainPage lock={lock} />
      <CheckInConfirmation />
    </Story>
  );
};

export default CheckInModal;
