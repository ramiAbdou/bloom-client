import useMutation from '@hooks/useMutation';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { CreateEventGuestArgs } from './Events.types';

const useCreateEventGuest = () => {
  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: 'createEventGuest',
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
