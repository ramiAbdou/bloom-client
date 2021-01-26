import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/entities';
import { useStoreState } from '@store/Store';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const { endTime, recordingUrl }: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  }, deepequal);

  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const isPast = day().isAfter(day(endTime));

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Button
      fill
      secondary
      disabled={!recordingUrl}
      href={recordingUrl}
      large={large}
      show={!isAdmin && isPast}
      onClick={onClick}
    >
      {recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
