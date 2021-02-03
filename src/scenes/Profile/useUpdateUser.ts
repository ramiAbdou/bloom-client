import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
import { UPDATE_USER, UpdateUserArgs } from './Profile.gql';

const useUpdateUser = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateUser] = useMutation<IMember, UpdateUserArgs>({
    name: 'updateUser',
    query: UPDATE_USER,
    schema: Schema.MEMBER
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const bio = items.BIO?.value;
    const firstName = items.FIRST_NAME?.value;
    const lastName = items.LAST_NAME?.value;
    const profilePicture = items.PROFILE_PICTURE?.value;

    let pictureUrl: string;

    if (profilePicture) {
      try {
        pictureUrl = await uploadImage({
          base64String: profilePicture,
          key: 'PROFILE_PICTURE'
        });
      } catch (e) {
        setError('Failed to upload image.');
        return;
      }
    }

    const { error } = await updateUser({
      bio,
      firstName,
      lastName,
      pictureUrl
    });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: 'Personal information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
