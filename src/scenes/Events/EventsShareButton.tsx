import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';

interface EventShareButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventShareButton: React.FC<EventShareButtonProps> = ({
  eventId,
  large
}) => {
  const { eventUrl, startTime }: IEvent = useStoreState(({ db }) => {
    const { byId } = db.entities.events;
    return byId[eventId];
  }, deepequal);

  const isGoing: boolean = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    const guests = new Set(db.member.guests);
    const event: IEvent = byEventId[eventId];
    return event?.guests?.some((guestId: string) => guests.has(guestId));
  });

  const isUpcoming = day.utc().isBefore(day.utc(startTime));
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button
      fill
      secondary
      large={large}
      show={isUpcoming && (large || isGoing)}
      onClick={onClick}
    >
      Share Event
    </Button>
  );
};

export default EventShareButton;
