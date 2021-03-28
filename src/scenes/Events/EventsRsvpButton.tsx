import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { MutationEvent } from '@util/constants.events';
import { DeleteEventGuestArgs } from './Events.types';
import useCreateEventGuest from './useCreateEventGuest';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const showToast = useStoreActions(({ toast }) => {
    return toast.showToast;
  });

  const startTime = useStoreState(({ db }) => {
    return db.byEventId[eventId]?.startTime;
  });

  const isMember = useStoreState(({ db }) => {
    return db.isMember;
  });

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(
      db.member?.guests?.filter((guestId: string) => {
        return !db.byGuestId[guestId]?.deletedAt;
      })
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.guests?.some((guestId: string) => {
      return guests.has(guestId);
    });
  });

  const createEventGuest = useCreateEventGuest();

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await createEventGuest({ eventId });

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

  const isUpcoming = day().isBefore(day(startTime));

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
