import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
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
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);

  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const recordingUrl: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.recordingUrl;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

  const createEventWatch = useCreateEventWatch();

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
