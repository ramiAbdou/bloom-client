import useMutation from '@hooks/useMutation';
import { UseMutationFnResult } from '@hooks/useMutation.types';
import { IEventWatch } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';

const useCreateEventWatch = (): ((
  variables?: any
) => Promise<UseMutationFnResult<IEventWatch>>) => {
  const [createEventWatch] = useMutation<IEventWatch>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: MutationEvent.CREATE_EVENT_WATCH,
    schema: Schema.EVENT_WATCH,
    types: { eventId: { required: true } }
  });

  return createEventWatch;
};

export default useCreateEventWatch;
