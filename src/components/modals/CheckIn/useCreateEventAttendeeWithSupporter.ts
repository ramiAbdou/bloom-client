import { IEventGuest } from '@db/db.entities';
import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
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
    db,
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
      eventId: db.eventId,
      firstName,
      lastName
    });

    if (error) setError(error);
    else {
      const { data: event } = await gql.events.findOne({
        fields: ['videoUrl'],
        where: { id: db.eventId }
      });

      openHref(event?.videoUrl);
      setCurrentPage({ branchId: 'ATTENDEE_CONFIRMATION', id: 'CONFIRMATION' });
      goForward();
    }
  };

  return onSubmit;
};

export default useCreateEventAttendeeWithSupporter;
