import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useGql from '@gql/useGql';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const gql = useGql();
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);
  const memberId: string = useStoreState(({ db }) => db.member?.id);

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

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await gql.eventWatches.create({
      body: { eventId, memberId },
      fields: [
        'createdAt',
        'event.id',
        'id',
        'member.firstName',
        'member.id',
        'member.lastName',
        'member.pictureUrl'
      ]
    });
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
