import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@db/db.entities';
import useGQL from '@gql/useGQL';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const gql = useGQL();
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { eventId, memberId },
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
