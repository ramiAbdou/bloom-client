import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { UpdateUserSocialsArgs } from './Profile.types';

const useUpdateMemberSocials = (): OnFormSubmit => {
  const [updateMemberSocials] = useMutation<IUser, UpdateUserSocialsArgs>({
    fields: [
      'clubhouseUrl',
      'id',
      'facebookUrl',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl'
    ],
    operation: MutationEvent.UPDATE_MEMBER_SOCIALS,
    schema: Schema.MEMBER_SOCIALS,
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

    const { error } = await updateMemberSocials({
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

    closeModal();
    showToast({ message: 'Social media updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberSocials;
