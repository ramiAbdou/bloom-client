import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { ModalData } from '@components/organisms/Modal/Modal.types';
import { useStoreActions } from '@core/store/Store';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useIsMember from '@hooks/useIsMember';
import { ModalType } from '@util/constants';
import { EventTiming, getEventTiming } from './Events.util';
import useCreateEventAttendeeWithMember from './useCreateEventAttendeeWithMember';

interface EventsJoinButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsJoinButton: React.FC<EventsJoinButtonProps> = ({
  eventId,
  large
}) => {
  const isMember: boolean = useIsMember();

  const { endTime, startTime, videoUrl } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime', 'videoUrl'],
    where: { id: eventId }
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const isHappeningNowOrStartingSoon: boolean = [
    EventTiming.HAPPENING_NOW,
    EventTiming.STARTING_SOON
  ].includes(getEventTiming({ endTime, startTime }));

  const createEventAttendeeWithMember = useCreateEventAttendeeWithMember();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop propagation so that we don't open the event page (default for
    // clicking the background of an EventsCard).
    e.stopPropagation();

    if (isMember) await createEventAttendeeWithMember({ eventId });
    else showModal({ id: ModalType.CHECK_IN, metadata: eventId });
  };

  return (
    <Button
      fill
      primary
      href={isMember ? videoUrl : null}
      large={large}
      show={isHappeningNowOrStartingSoon}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventsJoinButton;
