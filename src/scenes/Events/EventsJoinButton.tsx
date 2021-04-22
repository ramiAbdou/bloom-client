import React from 'react';

import { gql } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.reactive';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

type EventsJoinButtonProps = Partial<Pick<ButtonProps, 'large'>>;

const EventsJoinButton: ComponentWithFragments<
  IEvent,
  EventsJoinButtonProps
> = ({ data: event, large }) => {
  const isMember: boolean = useIsMember();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isHappeningNowOrStartingSoon: boolean =
    eventTiming === EventTiming.HAPPENING_NOW ||
    eventTiming === EventTiming.STARTING_SOON;

  if (!isHappeningNowOrStartingSoon) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop propagation so that we don't open the event page (default for
    // clicking the background of an EventsCard).
    e.stopPropagation();

    if (!isMember) {
      modalVar({ id: ModalType.CHECK_IN, metadata: event.id });
    }

    // await gql.create(IEventAttendee, {
    //   data: { eventId: event.id, memberId },
    //   fields: [
    //     'createdAt',
    //     'event.id',
    //     'member.id',
    //     'member.email',
    //     'member.firstName',
    //     'member.lastName',
    //     'member.pictureUrl'
    //   ],
    //   modifications: [{ entity: IEvent, field: 'eventAttendees', id: event.id }]
    // });
  };

  return (
    <Button
      fill
      primary
      href={isMember ? event.videoUrl : null}
      large={large}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

EventsJoinButton.fragment = gql`
  fragment EventsJoinButtonFragment on events {
    endTime
    startTime
    videoUrl
  }
`;

export default EventsJoinButton;
