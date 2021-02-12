import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IEvent, IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { CreateEventGuestArgs, DeleteEventGuestArgs } from './Events.types';

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

  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const memberId = useStoreState(({ db }) => db.member?.id);

  const isGoing: boolean = useStoreState(({ db }) => {
    const guests = new Set(db.member?.guests);
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
      {
        member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }]
      }
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

    if (!isAuthenticated) {
      showModal({ id: ModalType.CHECK_IN, metadata: eventId });
      return;
    }

    const { data } = await createEventGuest();

    const options: ToastOptions<boolean, DeleteEventGuestArgs> = {
      message: 'RSVP was registered.',
      mutationArgsOnUndo: {
        deleteArgs: {
          ids: [data.id],
          refs: [
            { column: 'guests', id: eventId, table: 'events' },
            { column: 'guests', id: memberId, table: 'members' }
          ],
          table: 'guests'
        },
        operation: 'deleteEventGuest',
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
