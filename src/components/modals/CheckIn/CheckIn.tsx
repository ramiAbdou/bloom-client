import React from 'react';

import { EventPrivacy, IEvent } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import useIsMember from '@hooks/useIsMember';
import Story from '@organisms/Story/Story';
import { useStoreState } from '@store/Store';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInMainPage from './CheckInMainPage';

const CheckInModal: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);
  const isMember: boolean = useIsMember();

  const { privacy } = useFindOne(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
  });

  const lock: boolean = privacy === EventPrivacy.MEMBERS_ONLY && !isMember;

  return (
    <Story>
      <CheckInChoosePage show={!lock} />
      <CheckInMainPage lock={lock} />
      <CheckInConfirmation />
    </Story>
  );
};

export default CheckInModal;
