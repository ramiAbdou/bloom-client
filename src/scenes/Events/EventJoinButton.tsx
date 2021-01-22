import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import useMutation from '@hooks/useMutation';
// import useMutation from '@hooks/useMutation';
import { IEvent, IEventAttendee } from '@store/entities';
import { Schema } from '@store/schema';
// import { useStoreState } from '@store/Store';
// import { Schema } from '@store/schema';
// import { useStoreState } from '@store/Store';
import { CREATE_EVENT_ATTENDEE, CreateEventAttendeeArgs } from './Events.gql';

interface EventJoinButtonProps
  extends ButtonProps,
    Pick<IEvent, 'endTime' | 'startTime' | 'videoUrl'> {
  eventId: string;
}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  endTime,
  eventId,
  startTime,
  videoUrl,
  ...props
}) => {
  const isHappeningNow =
    day.utc().isAfter(day.utc(startTime)) &&
    day.utc().isBefore(day.utc(endTime));

  const [createEventAttendee] = useMutation<
    IEventAttendee,
    CreateEventAttendeeArgs
  >({
    name: 'createEventAttendee',
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
      show={isHappeningNow}
      {...props}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventJoinButton;
