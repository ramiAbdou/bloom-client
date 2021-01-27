import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { IEvent, IEventGuest } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { ToastOptions } from '../../components/organisms/Toast/Toast.types';
import {
  CREATE_EVENT_GUEST,
  CreateEventGuestArgs,
  DELETE_EVENT_GUEST,
  DeleteEventGuestArgs
} from './Events.gql';

interface EventRsvpButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventRsvpButton: React.FC<EventRsvpButtonProps> = ({
  eventId,
  ...props
}) => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const startTime = useStoreState(({ db }) => {
    const { byId } = db.entities.events;
    return byId[eventId]?.startTime;
  });

  const memberId = useStoreState(({ db }) => db.member.id);

  const isGoing: boolean = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    const guests = new Set(db.member.guests);
    const event: IEvent = byEventId[eventId];
    return event?.guests?.some((guestId: string) => guests.has(guestId));
  });

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST,
    variables: { eventId }
  });

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
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
        name: 'deleteEventGuest',
        query: DELETE_EVENT_GUEST,
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
