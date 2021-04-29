import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Modal from '@components/organisms/Modal/Modal';
import Story from '@components/organisms/Story/Story';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import CheckInChoosePage from './CheckInModalChoosePage';
import CheckInConfirmation from './CheckInModalConfirmation';
import CheckInMainPage from './CheckInModalMainPage';

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
    <Modal>
      <Story>
        <CheckInChoosePage show={!lock} />
        <CheckInMainPage lock={lock} />
        <CheckInConfirmation />
      </Story>
    </Modal>
  );
};

export default CheckInModal;