import validator from 'validator';

import useGQL from '@gql/useGQL';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { uploadImage } from '@util/imageUtil';

const useUpdateMember = (): OnFormSubmitFunction => {
  const gql = useGQL();

  const onSubmit = async ({
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const bio: string = items.BIO?.value as string;
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const base64String: string = items.PROFILE_PICTURE?.value as string;

    let pictureUrl: string;

    if (base64String && !validator.isURL(base64String)) {
      try {
        pictureUrl = await uploadImage({
          base64String,
          key: 'PROFILE',
          previousImageUrl: db.member?.pictureUrl
        });
      } catch (e) {
        setError('Failed to upload image.');
        return;
      }
    }

    const { error } = await gql.members.update({
      data: { bio, firstName, lastName, pictureUrl },
      where: { id: db.member.id }
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

export default useUpdateMember;
