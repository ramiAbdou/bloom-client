import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@util/constants.entities';
import { MutationEvent } from '@util/constants.events';

const useCreateEventGuestWithSupporter = (): OnFormSubmitFunction => {
  const eventId: string = useReactiveVar(eventIdVar);

  const [createEventGuestWithSupporter] = useBloomMutation<
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
