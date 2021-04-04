import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useGql from '@gql/useGql';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IEvent } from '@db/db.entities';
import { Schema } from '@db/db.schema';
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
  const gql = useGql();

  const isMember: boolean = useStoreState(({ db }) => db.isMember);
  const memberId: string = useStoreState(({ db }) => db.member?.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const endTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.endTime;
  });

  const startTime: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event.startTime;
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(
      db.member?.eventGuests?.filter(
        (guestId: string) => !db.byEventGuestId[guestId]?.deletedAt
      )
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.eventGuests?.some((guestId: string) => guests.has(guestId));
  });

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await gql.eventGuests.create({
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
        schema: Schema.EVENT_GUEST,
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
