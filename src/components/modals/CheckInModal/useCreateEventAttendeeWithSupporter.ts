import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@util/constants.entities';
import { MutationEvent } from '@util/constants.events';
import { openHref } from '@util/util';

const useCreateEventAttendeeWithSupporter = (): OnFormSubmitFunction => {
  const [createEventAttendeeWithSupporter] = useBloomMutation<
    IEventGuest,
    CreateEventGuestArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: MutationEvent.CREATE_EVENT_ATTENDEE_WITH_SUPPORTER,
    types: {
      email: { required: false },
      eventId: { required: true },
      firstName: { required: false },
      lastName: { required: false }
    }
  });

  const onSubmit = async ({
    formDispatch,
    storyDispatch,
    items
  }: OnFormSubmitArgs) => {
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    const { error } = await createEventAttendeeWithSupporter({
      email,
      eventId: '',
      firstName,
      lastName
    });

    if (error) formDispatch({ error, type: 'SET_ERROR' });
    else {
      const videoUrl = '';
      openHref(videoUrl);

      storyDispatch({
        branchId: 'ATTENDEE_CONFIRMATION',
        pageId: 'CONFIRMATION',
        type: 'SET_CURRENT_PAGE'
      });

      storyDispatch({ type: 'GO_FORWARD' });
    }
  };

  return onSubmit;
};

export default useCreateEventAttendeeWithSupporter;
