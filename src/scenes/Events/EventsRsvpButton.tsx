import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { CREATE_EVENT_GUEST } from './Events.gql';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const startTime = useStoreState(({ db }) => {
    const { byId } = db.entities.events;
    return byId[eventId]?.startTime;
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    const guests = new Set(db.member.guests);
    const event: IEvent = byEventId[eventId];
    return event?.guests?.some((guestId: string) => guests.has(guestId));
  });

  const isUpcoming = day().isBefore(day(startTime));

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    showToast({
      message: 'RSVP has been registered.',
      mutationArgs: {
        name: 'createEventGuest',
        query: CREATE_EVENT_GUEST,
        schema: Schema.EVENT_GUEST,
        variables: { eventId }
      }
    });
    // createEventGuest();
  };

  return (
    <Button
      fill
      primary
      show={!isGoing && isUpcoming}
      onClick={onClick}
      {...props}
    >
      RSVP
    </Button>
  );
};

export default EventRsvpButton;
