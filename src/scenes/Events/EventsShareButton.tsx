import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@db/db.entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { EventTiming, getEventTiming } from './Events.util';

interface EventShareButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventShareButton: React.FC<EventShareButtonProps> = ({
  eventId,
  large
}) => {
  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const eventUrl: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.eventUrl;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(
      db.member?.eventGuests?.filter(
        (guestId: string) => !db.byEventGuestId[guestId]?.deletedAt
      )
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.eventGuests?.some((guestId: string) => guests.has(guestId));
  });

  const isAdmin = useStoreState(({ db }) => !!db.member?.role);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  const showOnSmall = !large && !!isGoing;
  const showOnLarge = !!large && (!isAdmin || (isAdmin && !!isGoing));

  return (
    <Button
      fill
      secondary
      large={large}
      show={isUpcoming && (showOnSmall || showOnLarge)}
      onClick={onClick}
    >
      Share Event
    </Button>
  );
};

export default EventShareButton;
