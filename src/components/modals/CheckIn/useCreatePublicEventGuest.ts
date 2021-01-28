import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import {
  CREATE_EVENT_GUEST,
  CreateEventGuestArgs
} from '@scenes/Events/Events.gql';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useCreatePublicEventGuest = () => {
  const eventId = useStoreState(({ db }) => db.event.id);

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST
  });

  const goToNextPage = StoryStore.useStoreActions(
    (store) => store.goToNextPage
  );

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const firstName = items.find(({ category }) => category === 'FIRST_NAME')
      ?.value;

    const lastName = items.find(({ category }) => category === 'LAST_NAME')
      ?.value;

    const email = items.find(({ category }) => category === 'EMAIL')?.value;

    const { error } = await createEventGuest({
      email,
      eventId,
      firstName,
      lastName
    });

    if (error) setErrorMessage(error);
    else goToNextPage();
  };

  return onSubmit;
};

export default useCreatePublicEventGuest;
