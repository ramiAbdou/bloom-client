import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { CREATE_EVENT_ATTENDEE, CreateEventAttendeeArgs } from './Events.gql';

interface EventJoinButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  eventId,
  large
}) => {
  const { endTime, startTime, videoUrl }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId];
  }, deepequal);

  const isHappeningNow =
    day().isAfter(day(startTime)) && day().isBefore(day(endTime));

  const [createEventAttendee] = useMutation<
    IEventAttendee,
    CreateEventAttendeeArgs
  >({
    operation: 'createEventAttendee',
    query: CREATE_EVENT_ATTENDEE,
    schema: Schema.EVENT_ATTENDEE,
    variables: { eventId }
  });

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await createEventAttendee();
  };

  return (
    <Button
      fill
      primary
      href={videoUrl}
      large={large}
      show={isHappeningNow}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventJoinButton;
