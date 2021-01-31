import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { uploadImage } from '@util/imageUtil';
import { UPDATE_USER, UpdateUserArgs, UpdateUserResult } from './Profile.gql';

const useUpdateUser = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateUser] = useMutation<UpdateUserResult, UpdateUserArgs>({
    name: 'updateUser',
    query: UPDATE_USER,
    schema: { member: Schema.MEMBER, user: Schema.USER }
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const bio = items.bio?.value;
    const facebookUrl = items['Facebook URL']?.value;
    const firstName = items.FIRST_NAME?.value;
    const instagramUrl = items['Instagram URL']?.value;
    const lastName = items.LAST_NAME?.value;
    const linkedInUrl = items['LinkedIn URL']?.value;
    const profilePicture = items.profilePicture?.value;
    const twitterUrl = items['Twitter URL']?.value;

    let pictureUrl: string;

    if (profilePicture) {
      try {
        pictureUrl = await uploadImage({
          base64String: profilePicture,
          key: 'PROFILE_PICTURE'
        });
      } catch {
        setError('Failed to upload image.');
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
      setError(error);
      return;
    }

    showToast({ message: 'Personal information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
