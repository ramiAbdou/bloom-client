import React from 'react';

import Story from '@components/organisms/Story/Story';
import { EventPrivacy, IEvent } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import useIsMember from '@hooks/useIsMember';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInMainPage from './CheckInMainPage';

const CheckInModal: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);
  const isMember: boolean = useIsMember();

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
  });

  if (loading) return null;

  const lock: boolean =
    event.privacy === EventPrivacy.MEMBERS_ONLY && !isMember;

  return (
    <Story>
      <CheckInChoosePage show={!lock} />
      <CheckInMainPage lock={lock} />
      <CheckInConfirmation />
    </Story>
  );
};

export default CheckInModal;
