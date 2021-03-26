import useMutation from '@hooks/useMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { UpdateUserSocialsArgs } from './Profile.types';

const useUpdateMemberSocials = (): OnFormSubmitFunction => {
  const [updateMemberSocials] = useMutation<IUser, UpdateUserSocialsArgs>({
    fields: ['id', 'facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    operation: MutationEvent.UPDATE_MEMBER_SOCIALS,
    schema: Schema.MEMBER_SOCIALS,
    types: {
      facebookUrl: { required: false },
      instagramUrl: { required: false },
      linkedInUrl: { required: false },
      twitterUrl: { required: false }
    }
  });

  const onSubmit = async (args: OnFormSubmitArgs) => {
    const { closeModal, items, setError, showToast } = args;

    const facebookUrl = items.FACEBOOK_URL?.value;
    const instagramUrl = items.INSTAGRAM_URL?.value;
    const linkedInUrl = items.LINKED_IN_URL?.value;
    const twitterUrl = items.TWITTER_URL?.value;

    const { error } = await updateMemberSocials({
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
