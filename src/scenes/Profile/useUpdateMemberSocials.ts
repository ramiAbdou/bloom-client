import { showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { modalVar } from '@core/state/Modal.state';
import { IMemberSocials } from '@util/constants.entities';

interface UpdateMemberSocialsArgs {
  facebookUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
}

const UPDATE_MEMBER_SOCIALS: DocumentNode = gql`
  mutation UpdateMemberSocials(
    $facebookUrl: String
    $instagramUrl: String
    $linkedInUrl: String
    $memberSocialsId: String!
    $twitterUrl: String
  ) {
    memberSocialsId @client @export(as: "memberSocialsId")

    updateMemberSocials(
      pk_columns: { id: $memberSocialsId }
      _set: {
        facebookUrl: $facebookUrl
        instagramUrl: $instagramUrl
        linkedInUrl: $linkedInUrl
        twitterUrl: $twitterUrl
      }
    ) {
      facebookUrl
      id
      instagramUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

const useUpdateMemberSocials = (): OnFormSubmitFunction => {
  const [updateMemberSocials] = useMutation<
    IMemberSocials,
    UpdateMemberSocialsArgs
  >(UPDATE_MEMBER_SOCIALS);

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
    const facebookUrl: string = items.FACEBOOK_URL?.value as string;
    const instagramUrl: string = items.INSTAGRAM_URL?.value as string;
    const linkedInUrl: string = items.LINKED_IN_URL?.value as string;
    const twitterUrl: string = items.TWITTER_URL?.value as string;

    const { errors } = await updateMemberSocials({
      variables: { facebookUrl, instagramUrl, linkedInUrl, twitterUrl }
    });

    if (errors?.length) {
      formDispatch({
        error: 'Failed to update social media.',
        type: 'SET_ERROR'
      });

      return;
    }

    modalVar(null);
    showToast({ message: 'Social media updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberSocials;
