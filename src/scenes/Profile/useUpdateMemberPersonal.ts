import { showToast } from 'src/App.reactive';
import validator from 'validator';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import { IMember } from '@util/constants.entities';
import { uploadImage } from '@util/imageUtil';

interface UpdateMemberPersonalArgs {
  bio?: string;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
}

const UPDATE_MEMBER_PERSONAL: DocumentNode = gql`
  mutation UpdateMemberPersonal(
    $bio: String
    $firstName: String
    $lastName: String
    $memberId: String!
    $pictureUrl: String
  ) {
    memberId @client @export(as: "memberId")

    updateMember(
      pk_columns: { id: $memberId }
      _set: {
        bio: $bio
        firstName: $firstName
        lastName: $lastName
        pictureUrl: $pictureUrl
      }
    ) {
      bio
      firstName
      id
      lastName
      pictureUrl
    }
  }
`;

const useUpdateMemberPersonal = (): OnFormSubmitFunction => {
  const [updateMemberPersonal] = useMutation<IMember, UpdateMemberPersonalArgs>(
    UPDATE_MEMBER_PERSONAL
  );

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
    const bio: string = items.BIO?.value as string;
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const base64String: string = items.PROFILE_PICTURE?.value as string;

    let pictureUrl: string = base64String;

    if (base64String && !validator.isURL(base64String)) {
      try {
        pictureUrl = await uploadImage({ base64String, key: 'PROFILE' });
      } catch (e) {
        formDispatch({ error: 'Failed to upload image.', type: 'SET_ERROR' });
        return;
      }
    }

    const { errors } = await updateMemberPersonal({
      variables: { bio, firstName, lastName, pictureUrl }
    });

    if (errors) {
      formDispatch({
        error: 'Failed to update personal information.',
        type: 'SET_ERROR'
      });

      return;
    }

    closeModal();
    showToast({ message: 'Personal information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberPersonal;
