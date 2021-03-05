import useMutation from '@hooks/useMutation';
import { IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { CreateEventAttendeeArgs } from './Events.types';

const useCreateEventAttendee = () => {
  const [createEventAttendee] = useMutation<
    IEventAttendee,
    CreateEventAttendeeArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: 'createEventAttendee',
    schema: Schema.EVENT_ATTENDEE,
    types: { eventId: { required: true } }
  });

  return createEventAttendee;
};

export default useCreateEventAttendee;
