import useMutation from '@gql/useMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const useCreateEventGuestWithSupporter = (): OnFormSubmitFunction => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const [createEventGuestWithSupporter] = useMutation<
    IEventGuest,
    CreateEventGuestArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: MutationEvent.CREATE_EVENT_GUEST_WITH_SUPPORTER,
    schema: Schema.EVENT_GUEST,
    types: {
      email: { required: true },
      eventId: { required: true },
      firstName: { required: true },
      lastName: { required: true }
    }
  });

  const onSubmit = async ({ goForward, items, setError }: OnFormSubmitArgs) => {
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    const { error } = await createEventGuestWithSupporter({
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

export default useCreateEventGuestWithSupporter;
