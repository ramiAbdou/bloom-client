import useMutation from '@gql/useMutation';
import { UseMutationFnResult } from '@gql/useMutation.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { CreateEventGuestArgs } from './Events.types';

const useCreateEventGuestWithMember = (): ((
  variables?: CreateEventGuestArgs
) => Promise<UseMutationFnResult<IEventGuest>>) => {
  const [createEventGuestWithMember] = useMutation<
    IEventGuest,
    CreateEventGuestArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: MutationEvent.CREATE_EVENT_GUEST_WITH_MEMBER,
    schema: Schema.EVENT_GUEST,
    types: { eventId: { required: true } }
  });

  return createEventGuestWithMember;
};

export default useCreateEventGuestWithMember;
