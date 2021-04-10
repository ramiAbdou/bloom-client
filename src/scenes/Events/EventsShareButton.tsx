import React from 'react';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { IEvent, IEventGuest, IMember } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { useStoreActions, useStoreState } from '@store/Store';
import { APP } from '@util/constants';
import { EventTiming, getEventTiming } from './Events.util';

interface EventShareButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventShareButton: React.FC<EventShareButtonProps> = ({
  eventId,
  large
}) => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const event: IEvent = useFindOne(IEvent, {
    fields: [
      'community.id',
      'community.urlName',
      'endTime',
      'eventGuests.deletedAt',
      'eventGuests.id',
      'eventGuests.member.id',
      'startTime'
    ],
    where: { id: eventId }
  });

  const eventUrl: string = `${APP.CLIENT_URL}/${event.community.urlName}/events/${eventId}`;

  const isGoing: boolean = event.eventGuests.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  const showOnSmall = !large && !!isGoing;
  const showOnLarge = !!large && (!role || (role && !!isGoing));

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
