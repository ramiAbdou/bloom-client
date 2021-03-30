import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ModalData } from '@organisms/Modal/Modal.types';
import { IEvent } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
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
  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const videoUrl: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.videoUrl;
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const isMember: boolean = useStoreState(({ db }) => db.isMember);

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
