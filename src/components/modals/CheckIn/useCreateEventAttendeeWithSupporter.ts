import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
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
    schema: Schema.EVENT_ATTENDEE,
    types: {
      email: { required: false },
      eventId: { required: true },
      firstName: { required: false },
      lastName: { required: false }
    }
  });

  const onSubmit = async ({
    db,
    goForward,
    items,
    setError
  }: OnFormSubmitArgs) => {
    const { id: eventId, videoUrl } = db.event;
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const email: string = items.EMAIL?.value as string;

    const { error } = await createEventAttendeeWithSupporter({
      email,
      eventId,
      firstName,
      lastName
    });

    if (error) setError(error);
    else {
      openHref(videoUrl);
      setCurrentPage({ branchId: 'ATTENDEE_CONFIRMATION', id: 'CONFIRMATION' });
      goForward();
    }
  };

  return onSubmit;
};

export default useCreateEventAttendeeWithSupporter;
