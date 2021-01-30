import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import StoryStore from '@organisms/Story/Story.store';
import { useStoreState } from '@store/Store';
import { IS_EMAIL_TAKEN, IsEmailTakenArgs } from './Application.gql';

const useSubmitMainApplication = () => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);
  const goForward = StoryStore.useStoreActions((store) => store.goForward);
  const setItems = StoryStore.useStoreActions((store) => store.setItems);

  const [isEmailTaken] = useMutation<boolean, IsEmailTakenArgs>({
    name: 'isEmailTaken',
    query: IS_EMAIL_TAKEN
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const email = items.find((item) => item.category === 'EMAIL')?.value;
    const { error } = await isEmailTaken({ communityId, email });

    if (error) {
      setErrorMessage(error);
      return;
    }

    setItems(items);
    goForward();
  };

  return onSubmit;
};

export default useSubmitMainApplication;
