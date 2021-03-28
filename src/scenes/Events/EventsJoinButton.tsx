import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import useCreateEventAttendee from './useCreateEventAttendee';

interface EventJoinButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  eventId,
  large
}) => {
  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const { endTime, startTime, videoUrl }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId];
  });

  const isMember = useStoreState(({ db }) => {
    return db.isMember;
  });

  const isHappeningNow =
    day().isAfter(day(startTime)) && day().isBefore(day(endTime));

  const createEventAttendee = useCreateEventAttendee();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await createEventAttendee({ eventId });
  };

  return (
    <Button
      fill
      primary
      href={isMember ? videoUrl : null}
      large={large}
      show={isHappeningNow}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventJoinButton;
