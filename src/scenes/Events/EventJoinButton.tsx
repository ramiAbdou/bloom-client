import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
// import useMutation from '@hooks/useMutation';
import { IEvent } from '@store/entities';
// import { Schema } from '@store/schema';
// import { useStoreState } from '@store/Store';
// import { CREATE_EVENT_GUEST, CreateEventGuestArgs } from './Events.gql';

interface EventJoinButtonProps
  extends ButtonProps,
    Pick<IEvent, 'endTime' | 'startTime'> {}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  endTime,
  startTime,
  ...props
}) => {
  const isHappeningNow =
    day.utc().isAfter(day.utc(startTime)) &&
    day.utc().isBefore(day.utc(endTime));

  // const eventId = useStoreState(({ db }) => db.event?.id);

  // const [createEventGuest] = useMutation<any, CreateEventGuestArgs>({
  //   name: 'createEventGuest',
  //   query: CREATE_EVENT_GUEST,
  //   schema: Schema.EVENT_GUEST,
  //   variables: { eventId }
  // });

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // createEventGuest();
  };

  return (
    <Button fill primary show={isHappeningNow} {...props} onClick={onClick}>
      Join
    </Button>
  );
};

export default EventJoinButton;
