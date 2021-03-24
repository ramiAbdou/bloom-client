import validator from 'validator';

import useMutation from '@hooks/useMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { uploadImage } from '@util/imageUtil';
import { UpdateMemberArgs } from './Profile.types';

const useUpdateMember = (): OnFormSubmitFunction => {
  const [updateMember] = useMutation<IMember, UpdateMemberArgs>({
    fields: ['id', 'bio', 'firstName', 'lastName', 'pictureUrl'],
    operation: MutationEvent.UPDATE_MEMBER,
    schema: Schema.MEMBER,
    types: {
      bio: { required: false },
      firstName: { required: false },
      lastName: { required: false },
      pictureUrl: { required: false }
    }
  });

  const onSubmit = async ({
    closeModal,
    db,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const bio = items.BIO?.value;
    const firstName = items.FIRST_NAME?.value;
    const lastName = items.LAST_NAME?.value;
    const base64String = items.PROFILE_PICTURE?.value;

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

    const { error } = await updateMember({
      bio,
      firstName,
      lastName,
      pictureUrl
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
