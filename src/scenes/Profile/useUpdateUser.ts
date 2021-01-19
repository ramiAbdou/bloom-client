import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
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

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const bio = items.find(({ id }) => id === 'bio')?.value;

    const facebookUrl = items.find(({ title }) => title === 'Facebook URL')
      ?.value;

    const firstName = items.find(({ category }) => category === 'FIRST_NAME')
      ?.value;

    const instagramUrl = items.find(({ title }) => title === 'Instagram URL')
      ?.value;

    const lastName = items.find(({ category }) => category === 'LAST_NAME')
      ?.value;

    const linkedInUrl = items.find(({ title }) => title === 'LinkedIn URL')
      ?.value;

    const profilePicture = items.find(({ id }) => id === 'profilePicture')
      ?.value;

    const twitterUrl = items.find(({ title }) => title === 'Twitter URL')
      ?.value;

    let pictureUrl: string;

    if (profilePicture) {
      try {
        pictureUrl = await uploadImage({
          base64String: profilePicture,
          key: 'PROFILE_PICTURE'
        });
      } catch {
        setErrorMessage('Failed to upload image.');
        return;
      }
    }

    const { error } = await updateUser({
      bio,
      facebookUrl,
      firstName,
      instagramUrl,
      lastName,
      linkedInUrl,
      pictureUrl,
      twitterUrl
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    showToast({ message: 'Personal information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
