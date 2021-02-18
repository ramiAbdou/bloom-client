import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { CreateEventAttendeeArgs } from './Events.types';

interface EventJoinButtonProps extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  eventId,
  large
}) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { endTime, startTime, videoUrl }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId];
  }, deepequal);

  const isMember = useStoreState(({ db }) => db.isMember);

  const isHappeningNow =
    day().isAfter(day(startTime)) && day().isBefore(day(endTime));

  const [createEventAttendee] = useMutation<
    IEventAttendee,
    CreateEventAttendeeArgs
  >({
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
    operation: 'createEventAttendee',
    schema: Schema.EVENT_ATTENDEE,
    types: { eventId: { required: true } },
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

    await createEventAttendee();
  };

  return (
    <Button
      fill
      primary
      href={isMember ? videoUrl : null}
      large={large}
      show={isHappeningNow}
      onClick={onClick}
    >
      Join
    </Button>
  );
};

export default EventJoinButton;
