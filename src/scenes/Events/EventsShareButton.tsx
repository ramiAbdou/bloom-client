import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/Db/entities';
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

  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const isUpcoming = day().isBefore(day(startTime));

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  const showOnSmall = !large && isGoing;
  const showOnLarge = large && (!isAdmin || (isAdmin && !!isGoing));

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
