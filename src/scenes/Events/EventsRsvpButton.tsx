import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent, IEventGuest } from '@db/db.entities';
import GQL from '@gql/GQL';
import useFindOne from '@gql/useFindOne';
import useGQL from '@gql/useGQL';
import useIsMember from '@hooks/useIsMember';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { MutationEvent } from '@util/constants.events';
import { DeleteEventGuestArgs } from './Events.types';
import { EventTiming, getEventTiming } from './Events.util';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const gql: GQL = useGQL();

  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const isMember: boolean = useIsMember();

  const { endTime, eventGuests, startTime } = useFindOne(IEvent, {
    fields: [
      'endTime',
      'eventGuests.deletedAt',
      'eventGuests.id',
      'eventGuests.member.id',
      'startTime'
    ],
    where: { id: eventId }
  });

  const isGoing: boolean = eventGuests.some(
    (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
  );

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await gql.create(IEventGuest, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      body: { eventId, memberId },
      fields: [
        'createdAt',
        'event.id',
        'id',
        'member.firstName',
        'member.id',
        'member.lastName',
        'member.pictureUrl'
      ]
    });

    const options: ToastOptions<DeleteEventGuestArgs> = {
      message: 'RSVP was registered.',
      mutationArgsOnUndo: {
        fields: ['deletedAt', 'id'],
        operation: MutationEvent.DELETE_EVENT_GUEST,
        types: { eventId: { required: true } },
        variables: { eventId }
      }
    };

    showToast(options);
  };

  const isUpcoming: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.UPCOMING;

  return (
    <Button
      fill
      primary
      show={!isGoing && isUpcoming}
      onClick={onClick}
      {...props}
    >
      RSVP
    </Button>
  );
};

export default EventRsvpButton;
