import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { IS_EMAIL_TAKEN, IsEmailTakenArgs } from './Application.gql';

const useValidateEmail = () => {
  const setItems = StoryStore.useStoreActions((store) => store.setItems);

  const [isEmailTaken] = useMutation<boolean, IsEmailTakenArgs>({
    name: 'isEmailTaken',
    query: IS_EMAIL_TAKEN
  });

  const onSubmit = async ({
    db,
    items,
    goForward,
    setError
  }: OnFormSubmitArgs) => {
    const communityId: string = db.community?.id;
    const email = items.EMAIL?.value;
    const { error } = await isEmailTaken({ communityId, email });

    if (error) {
      setError(error);
      return;
    }

    setItems(items);
    goForward();
  };

  return onSubmit;
};

export default useValidateEmail;
