import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Story from '@components/organisms/Story/Story';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import CheckInChoosePage from './CheckInChoosePage';
import CheckInConfirmation from './CheckInConfirmation';
import CheckInMainPage from './CheckInMainPage';

const CheckInModal: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);
  const isMember: boolean = useIsMember();

  const { data: event, loading } = useFindOne(IEvent, {
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
