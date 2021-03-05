import useMutation from '@hooks/useMutation';
import { IEventWatch } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const useCreateEventWatch = () => {
  const [createEventWatch] = useMutation<IEventWatch>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: 'createEventWatch',
    schema: Schema.EVENT_WATCH,
    types: { eventId: { required: true } }
  });

  return createEventWatch;
};

export default useCreateEventWatch;
