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

  const onSubmit = async (args: OnFormSubmitArgs) => {
    const { closeModal, items, setError, showToast } = args;

    const clubhouseUrl: string = items.CLUBHOUSE_URL?.value as string;
    const facebookUrl: string = items.FACEBOOK_URL?.value as string;
    const instagramUrl: string = items.INSTAGRAM_URL?.value as string;
    const linkedInUrl: string = items.LINKED_IN_URL?.value as string;
    const twitterUrl: string = items.TWITTER_URL?.value as string;

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
