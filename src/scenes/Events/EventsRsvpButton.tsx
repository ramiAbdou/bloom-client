import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions } from '@core/store/Store';
import useIsMember from '@hooks/useIsMember';
import { ModalType } from '@util/constants';
import { IEvent, IEventGuest } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const memberId: string = useReactiveVar(memberIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isMember: boolean = useIsMember();

  const { data: event, loading } = useFindOne(IEvent, {
    fields: [
      'endTime',
      'eventGuests.deletedAt',
      'eventGuests.id',
      'eventGuests.member.id',
      'startTime'
    ],
    where: { id: eventId }
  });

  const isUpcoming: boolean = getEventTiming(event) === EventTiming.UPCOMING;

  const isAlreadyGoing: boolean = event.eventGuests?.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  // Don't show if loading, is already going or if the event is not upcoming.
  if (loading || isAlreadyGoing || !isUpcoming) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // We need to stop propagation because background of the card is also
    // a clickable button that redirects to the individual event page.
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    showModal({ id: ModalType.CONFIRM_RSVP, metadata: eventId });
  };

  return (
    <Button fill primary onClick={onClick} {...props}>
      RSVP
    </Button>
  );
};

export default EventRsvpButton;
