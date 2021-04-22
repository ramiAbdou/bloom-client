import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { IMemberSocials } from '@util/constants.entities';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';

const useUpdateMemberSocials = (): OnFormSubmitFunction => {
  const gql: GQL = useGQL();

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const facebookUrl: string = items.FACEBOOK_URL?.value as string;
    const instagramUrl: string = items.INSTAGRAM_URL?.value as string;
    const linkedInUrl: string = items.LINKED_IN_URL?.value as string;
    const twitterUrl: string = items.TWITTER_URL?.value as string;

    const { error } = await gql.update(IMemberSocials, {
      data: { facebookUrl, instagramUrl, linkedInUrl, twitterUrl },
      where: { member: { id: '' } }
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
