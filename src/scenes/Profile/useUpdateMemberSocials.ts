import mutate from '@gql/mutate';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';

const useUpdateMemberSocials = (): OnFormSubmitFunction => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const onSubmit = async ({
    apolloClient,
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const facebookUrl: string = items.FACEBOOK_URL?.value as string;
    const instagramUrl: string = items.INSTAGRAM_URL?.value as string;
    const linkedInUrl: string = items.LINKED_IN_URL?.value as string;
    const twitterUrl: string = items.TWITTER_URL?.value as string;

    const { error } = await mutate({
      client: apolloClient,
      fields: [
        'facebookUrl',
        'id',
        'instagramUrl',
        'linkedInUrl',
        'twitterUrl'
      ],
      mergeEntities,
      mutationName: 'UpdateMemberSocials',
      operation: 'updateMemberSocials',
      schema: [Schema.MEMBER_SOCIALS],
      set: { facebookUrl, instagramUrl, linkedInUrl, twitterUrl },
      where: { id: { _eq: db.member.memberSocials } }
    });

    if (error) {
      setError('Failed to update social media.');
      return;
    }

    closeModal();
    showToast({ message: 'Social media updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberSocials;
