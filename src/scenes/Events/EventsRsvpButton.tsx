import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { MutationEvent } from '@util/constants.events';
import { DeleteEventGuestArgs } from './Events.types';
import { EventTiming, getEventTiming } from './Events.util';
import useCreateEventGuestWithMember from './useCreateEventGuestWithMember';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const isMember: boolean = useStoreState(({ db }) => db.isMember);
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
      db.member?.guests?.filter(
        (guestId: string) => !db.byGuestId[guestId]?.deletedAt
      )
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.guests?.some((guestId: string) => guests.has(guestId));
  });

  const createEventGuestWithMember = useCreateEventGuestWithMember();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await createEventGuestWithMember({ eventId });

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
