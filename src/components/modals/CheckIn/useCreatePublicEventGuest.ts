import useMutation from '@hooks/useMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const useCreatePublicEventGuest = (): OnFormSubmitFunction => {
  const eventId: string = useStoreState(({ db }) => {
    return db.event?.id;
  });

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
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

  const onSubmit = async ({ goForward, items, setError }: OnFormSubmitArgs) => {
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    const { error } = await createEventGuest({
      email,
      eventId,
      firstName,
      lastName
    });

    if (error) setError(error);
    else goForward();
  };

  return onSubmit;
};

export default useCreatePublicEventGuest;
