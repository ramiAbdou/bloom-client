import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import useCreateEventWatch from './useCreateEventWatch';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const createEventWatch = useCreateEventWatch();

  const { endTime, recordingUrl }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId];
  }, deepequal);

  const isAdmin = useStoreState(({ db }) => {
    return !!db.member?.role;
  });

  const isPast = day().isAfter(day(endTime));

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await createEventWatch({ eventId });
  };

  return (
    <Button
      fill
      disabled={!recordingUrl}
      href={recordingUrl}
      large={large}
      primary={!!recordingUrl}
      secondary={!recordingUrl}
      show={isPast && (!isAdmin || !large || !!recordingUrl)}
      onClick={onClick}
    >
      {recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
