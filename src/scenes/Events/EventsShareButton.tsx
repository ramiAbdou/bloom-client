import React from 'react';
import { memberIdVar, toastQueueVar, useToast } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useFindOne from '@core/gql/hooks/useFindOne';
import { APP, ComponentWithFragments } from '@util/constants';
import { IEvent, IEventGuest, IMember } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

const EventShareButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const memberId: string = useReactiveVar(memberIdVar);
  const { showToast } = useToast(toastQueueVar);

  // const { data: event, loading: loading1 } = useFindOne(IEvent, {
  //   fields: [
  //     'eventGuests.deletedAt',
  //     'eventGuests.id',
  //     'eventGuests.member.id',
  //   ],
  //   where: { id: eventId }
  // });

  const { data: member } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isGoing: boolean = event.eventGuests?.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isUpcoming: boolean = eventTiming === EventTiming.UPCOMING;
  const showOnSmall: boolean = !large && !!isGoing;

  const showOnLarge: boolean =
    !!large && (!member.role || (member.role && !!isGoing));

  if (!isUpcoming || (!showOnSmall && !showOnLarge)) return null;

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    const eventUrl: string = `${APP.CLIENT_URL}/${event.community.urlName}/events/${event.id}`;

    navigator.clipboard.writeText(eventUrl);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button fill secondary large={large} onClick={onClick}>
      Share Event
    </Button>
  );
};

EventShareButton.fragment = gql`
  fragment EventShareButtonFragment on events {
    endTime
    startTime

    community {
      urlName
    }
  }
`;

export default EventShareButton;
