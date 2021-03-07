import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { openHref } from '@util/util';

const useCreatePublicEventAttendee = () => {
  const setCurrentPage = StoryStore.useStoreActions(
    (store) => store.setCurrentPage
  );

  const [createEventAttendee] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'email',
      'firstName',
      'id',
      'lastName',
      { event: ['id'] },
      { member: ['id', 'pictureUrl'] }
    ],
    operation: MutationEvent.CREATE_EVENT_ATTENDEE,
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

    const firstName = items.FIRST_NAME?.value;
    const lastName = items.LAST_NAME?.value;
    const email = items.EMAIL?.value;

    const { error } = await createEventAttendee({
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

export default useCreatePublicEventAttendee;
