import useMutation from '@hooks/useMutation';
import { UseMutationFnResult } from '@hooks/useMutation.types';
import { IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { CreateEventAttendeeArgs } from './Events.types';

const useCreateEventAttendee = (): ((
  variables?: CreateEventAttendeeArgs
) => Promise<UseMutationFnResult<IEventAttendee>>) => {
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
    operation: MutationEvent.CREATE_EVENT_ATTENDEE,
    schema: Schema.EVENT_ATTENDEE,
    types: { eventId: { required: true } }
  });

  return createEventAttendee;
};

export default useCreateEventAttendee;
