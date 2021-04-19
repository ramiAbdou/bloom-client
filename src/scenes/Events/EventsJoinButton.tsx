import React from 'react';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { IEvent, IEventAttendee } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions, useStoreState } from '@core/store/Store';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import useIsMember from '@hooks/useIsMember';
import { ModalType } from '@util/constants';
import { EventTiming, getEventTiming } from './Events.util';

interface EventsJoinButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsJoinButton: React.FC<EventsJoinButtonProps> = ({
  eventId,
  large
}) => {
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const gql: GQL = useGQL();
  const isMember: boolean = useIsMember();

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime', 'videoUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isHappeningNowOrStartingSoon: boolean =
    getEventTiming(event) === EventTiming.HAPPENING_NOW ||
    getEventTiming(event) === EventTiming.STARTING_SOON;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop propagation so that we don't open the event page (default for
    // clicking the background of an EventsCard).
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await gql.create(IEventAttendee, {
      data: { eventId, memberId },
      fields: [
        'createdAt',
        'event.id',
        'member.id',
        'member.email',
        'member.firstName',
        'member.lastName',
        'member.pictureUrl'
      ],
      modifications: [{ entity: IEvent, field: 'eventAttendees', id: eventId }]
    });
  };

  return (
    <Button
      fill
      primary
      href={isMember ? event.videoUrl : null}
      large={large}
      show={isHappeningNowOrStartingSoon}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventsJoinButton;
