import validator from 'validator';

import { IMember } from '@db/db.entities';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { uploadImage } from '@util/imageUtil';

const useUpdateMember = (): OnFormSubmitFunction => {
  const onSubmit = async ({
    closeModal,
    db,
    gql,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const bio: string = items.BIO?.value as string;
    const firstName: string = items.FIRST_NAME?.value as string;
    const lastName: string = items.LAST_NAME?.value as string;
    const base64String: string = items.PROFILE_PICTURE?.value as string;

    let pictureUrl: string;

    const member: IMember = await gql.findOne(IMember, {
      fields: ['pictureUrl'],
      where: { id: db.memberId }
    });

    if (base64String && !validator.isURL(base64String)) {
      try {
        pictureUrl = await uploadImage({
          base64String,
          key: 'PROFILE',
          previousImageUrl: member?.pictureUrl
        });
      } catch (e) {
        setError('Failed to upload image.');
        return;
      }
    }

    const { error } = await gql.update(IMember, {
      data: { bio, firstName, lastName, pictureUrl },
      where: { id: db.memberId }
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
