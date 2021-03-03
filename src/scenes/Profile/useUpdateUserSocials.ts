import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { UpdateUserSocialsArgs } from './Profile.types';

const useUpdateUserSocials = (): OnFormSubmit => {
  const [updateUser] = useMutation<IUser, UpdateUserSocialsArgs>({
    fields: [
      'clubhouseUrl',
      'id',
      'facebookUrl',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl'
    ],
    operation: 'updateUser',
    schema: Schema.USER,
    types: {
      clubhouseUrl: { required: false },
      facebookUrl: { required: false },
      instagramUrl: { required: false },
      linkedInUrl: { required: false },
      twitterUrl: { required: false }
    }
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const clubhouseUrl = items.CLUBHOUSE_URL?.value;
    const facebookUrl = items.FACEBOOK_URL?.value;
    const instagramUrl = items.INSTAGRAM_URL?.value;
    const linkedInUrl = items.LINKED_IN_URL?.value;
    const twitterUrl = items.TWITTER_URL?.value;

    const { error } = await updateUser({
      clubhouseUrl,
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
