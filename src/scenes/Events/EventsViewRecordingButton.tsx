import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { IEvent, IEventWatch } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { CreateEventWatchArgs } from './Events.types';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const [createEventWatch] = useMutation<IEventWatch, CreateEventWatchArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      {
        member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }]
      }
    ],
    operation: 'createEventWatch',
    schema: Schema.EVENT_WATCH,
    types: { eventId: { required: true } },
    variables: { eventId }
  });

  const { endTime, recordingUrl }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId];
  }, deepequal);

  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  const isPast = day().isAfter(day(endTime));

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await createEventWatch();
  };

  return (
    <Button
      fill
      secondary
      disabled={!recordingUrl}
      href={recordingUrl}
      large={large}
      show={isPast && (!isAdmin || !large)}
      onClick={onClick}
    >
      {recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
