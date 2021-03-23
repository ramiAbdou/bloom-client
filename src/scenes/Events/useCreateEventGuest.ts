import useMutation from '@hooks/useMutation';
import { UseMutationFnResult } from '@hooks/useMutation.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { CreateEventGuestArgs } from './Events.types';

const useCreateEventGuest = (): ((
  variables?: CreateEventGuestArgs
) => Promise<UseMutationFnResult<IEventGuest>>) => {
  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: MutationEvent.CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST,
    types: {
      email: { required: false },
      eventId: { required: true },
      firstName: { required: false },
      lastName: { required: false }
    }
  });

  return createEventGuest;
};

export default useCreateEventGuest;
