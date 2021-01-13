import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { useStoreActions } from '@store/Store';
import { Schema } from '../../core/store/schema';
import { UPDATE_USER, UpdateUserArgs, UpdateUserResult } from './Profile.gql';

const useUpdateUser = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateUser] = useMutation<UpdateUserResult, UpdateUserArgs>({
    name: 'updateUser',
    query: UPDATE_USER,
    schema: { member: Schema.MEMBER, user: Schema.USER }
  });

  const onSubmit = async ({
    items,
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    setIsLoading(true);

    const firstName = items.find(({ category }) => category === 'FIRST_NAME')
      ?.value;

    const lastName = items.find(({ category }) => category === 'LAST_NAME')
      ?.value;

    const bio = items.find(({ id }) => id === 'bio')?.value;

    const { error } = await updateUser({ bio, firstName, lastName });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error);
      return;
    }

    setIsLoading(false);
    showToast({ message: 'Personal information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
