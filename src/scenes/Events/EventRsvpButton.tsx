import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import useMutation from '@hooks/useMutation';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { CREATE_EVENT_GUEST, CreateEventGuestArgs } from './Events.gql';

interface EventRsvpButtonProps extends ButtonProps, Pick<IEvent, 'startTime'> {}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  show,
  startTime,
  ...props
}) => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const canRsvp = day.utc().isBefore(day.utc(startTime));

  const [createEventGuest] = useMutation<any, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST,
    variables: { eventId }
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    createEventGuest();
  };

  return (
    <Button fill primary show={canRsvp && show} {...props} onClick={onClick}>
      RSVP
    </Button>
  );
};

export default EventRsvpButton;
