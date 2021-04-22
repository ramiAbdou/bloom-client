import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import StoryStore from '@components/organisms/Story/Story.store';
import { IEvent, IEventGuest } from '@util/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { MutationEvent } from '@util/constants.events';
import { openHref } from '@util/util';

const useCreateEventAttendeeWithSupporter = (): OnFormSubmitFunction => {
  const setCurrentPage = StoryStore.useStoreActions(
    (state) => state.setCurrentPage
  );

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
    gql,
    goForward,
    items,
    setError
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

    if (error) setError(error);
    else {
      const { videoUrl } = await gql.findOne(IEvent, {
        fields: ['videoUrl'],
        where: { id: '' }
      });

      openHref(videoUrl);
      setCurrentPage({ branchId: 'ATTENDEE_CONFIRMATION', id: 'CONFIRMATION' });
      goForward();
    }
  };

  return onSubmit;
};

export default useCreateEventAttendeeWithSupporter;
