import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { UPDATE_USER_SOCIALS, UpdateUserSocialsArgs } from './Profile.gql';

const useUpdateUserSocials = (): OnFormSubmit => {
  const [updateUserSocials] = useMutation<IUser, UpdateUserSocialsArgs>({
    name: 'updateUserSocials',
    query: UPDATE_USER_SOCIALS,
    schema: Schema.USER
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const facebookUrl = items.FACEBOOK_URL?.value;
    const instagramUrl = items.INSTAGRAM_URL?.value;
    const linkedInUrl = items.LINKED_IN_URL?.value;
    const twitterUrl = items.TWITTER_URL?.value;

    const { error } = await updateUserSocials({
      facebookUrl,
      instagramUrl,
      linkedInUrl,
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

export default useUpdateUserSocials;
