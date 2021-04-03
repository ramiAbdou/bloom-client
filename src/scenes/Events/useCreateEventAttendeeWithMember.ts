import useBloomMutation from '@gql/useBloomMutation';
import { UseMutationFnResult } from '@gql/useBloomMutation.types';
import { IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { CreateEventAttendeeArgs } from './Events.types';

const useCreateEventAttendeeWithMember = (): ((
  variables?: CreateEventAttendeeArgs
) => Promise<UseMutationFnResult<IEventAttendee>>) => {
  const [createEventAttendeeWithMember] = useBloomMutation<
    IEventAttendee,
    CreateEventAttendeeArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: MutationEvent.CREATE_EVENT_ATTENDEE_WITH_MEMBER,
    schema: Schema.EVENT_ATTENDEE,
    types: { eventId: { required: true } }
  });

  return createEventAttendeeWithMember;
};

export default useCreateEventAttendeeWithMember;
