import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { CreateEventGuestArgs } from '@scenes/Events/Events.types';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useCreatePublicEventGuest = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    fields: [
      'createdAt',
      'email',
      'firstName',
      'id',
      'lastName',
      { event: ['id'] },
      {
        member: ['id', { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }]
      }
    ],
    operation: 'createEventGuest',
    schema: Schema.EVENT_GUEST,
    types: {
      email: { required: false },
      eventId: { required: true },
      firstName: { required: false },
      lastName: { required: false }
    }
  });

  const goForward = StoryStore.useStoreActions((store) => store.goForward);

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const firstName = items.FIRST_NAME?.value;
    const lastName = items.LAST_NAME?.value;
    const email = items.EMAIL?.value;

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
