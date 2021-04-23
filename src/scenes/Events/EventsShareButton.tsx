import React from 'react';
import { memberIdVar, toastQueueVar, useToast } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useMemberRole from '@core/hooks/useMemberRole';
import { APP, ComponentWithFragments } from '@util/constants';
import { IEvent, IEventGuest, MemberRole } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

const EventsShareButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const memberId: string = useReactiveVar(memberIdVar);
  const { showToast } = useToast(toastQueueVar);
  const role: MemberRole = useMemberRole();

  const isGoing: boolean = event.eventGuests?.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isUpcoming: boolean = eventTiming === EventTiming.UPCOMING;
  const showOnSmall: boolean = !large && !!isGoing;
  const showOnLarge: boolean = !!large && (!role || (role && !!isGoing));

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

EventsShareButton.fragment = gql`
  fragment EventsShareButtonFragment on events {
    endTime
    startTime

    community {
      urlName
    }
  }
`;

export default EventsShareButton;
