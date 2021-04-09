import { IEventAttendee } from '@db/db.entities';
import useBloomMutation, { UseMutationFnResult } from '@gql/useBloomMutation';
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
    types: { eventId: { required: true } }
  });

  return createEventAttendeeWithMember;
};

export default useCreateEventAttendeeWithMember;
