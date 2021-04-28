import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.state';
import useIsMember from '@hooks/useIsMember';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IEvent, IEventGuest } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

type EventRsvpButtonProps = Partial<Pick<ButtonProps, 'large'>>;

const EventRsvpButton: ComponentWithFragments<IEvent, EventRsvpButtonProps> = ({
  data: event,
  ...props
}) => {
  const memberId: string = useReactiveVar(memberIdVar);
  const isMember: boolean = useIsMember();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isUpcoming: boolean = eventTiming === EventTiming.UPCOMING;

  const isAlreadyGoing: boolean = event.eventGuests?.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  // Don't show if loading, is already going or if the event is not upcoming.
  if (isAlreadyGoing || !isUpcoming) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // We need to stop propagation because background of the card is also
    // a clickable button that redirects to the individual event page.
    e.stopPropagation();

    if (!isMember) {
      modalVar({ id: ModalType.CHECK_IN, metadata: event.id });
      return;
    }

    modalVar({ id: ModalType.CONFIRM_RSVP, metadata: event.id });
  };

  return (
    <Button fill primary onClick={onClick} {...props}>
      RSVP
    </Button>
  );
};

EventRsvpButton.fragment = gql`
  fragment EventsRsvpButtonFragment on events {
    endTime
    id
    startTime
  }
`;

export default EventRsvpButton;
