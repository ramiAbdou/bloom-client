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
    return db.byEventId[eventId];
  }, deepequal);

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(
      db.member?.guests?.filter((guestId: string) => {
        return !db.byGuestId[guestId]?.deletedAt;
      })
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.guests?.some((guestId: string) => {
      return guests.has(guestId);
    });
  });

  const isAdmin = useStoreState(({ db }) => {
    return !!db.member?.role;
  });

  const showToast = useStoreActions(({ toast }) => {
    return toast.showToast;
  });

  const isUpcoming = day().isBefore(day(startTime));

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
