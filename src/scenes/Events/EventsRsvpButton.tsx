import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IEvent, IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  CreateEventGuestArgs,
  DeleteEventGuestArgs,
  eventMemberFields
} from './Events.types';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const startTime = useStoreState(({ db }) => {
    return db.byEventId[eventId]?.startTime;
  });

  const isMember = useStoreState(({ db }) => db.isMember);

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(
      db.member?.guests?.filter(
        (guestId: string) => !db.byGuestId[guestId]?.deletedAt
      )
    );

    const event: IEvent = db.byEventId[eventId];
    return event?.guests?.some((guestId: string) => guests.has(guestId));
  });

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'email',
      'firstName',
      'id',
      'lastName',
      { event: ['id'] },
      ...eventMemberFields
    ],
    operation: 'createEventGuest',
    schema: Schema.EVENT_GUEST,
    types: {
      email: { required: false },
      eventId: { required: true },
      firstName: { required: false },
      lastName: { required: false }
    },
    variables: { eventId }
  });

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!isMember) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    await createEventGuest();

    const options: ToastOptions<boolean, DeleteEventGuestArgs> = {
      message: 'RSVP was registered.',
      mutationArgsOnUndo: {
        fields: ['deletedAt', 'id'],
        operation: 'deleteEventGuest',
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
