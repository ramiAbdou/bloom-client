import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { uploadImage } from '@util/imageUtil';
import { UpdateMemberArgs, UpdateUserArgs } from './Profile.types';

const useUpdateUser = (): OnFormSubmit => {
  const [updateMember] = useMutation<IMember, UpdateMemberArgs>({
    fields: ['id', 'bio'],
    operation: 'updateMember',
    schema: Schema.MEMBER,
    types: { bio: { required: false } }
  });

  const [updateUser] = useMutation<IMember, UpdateUserArgs>({
    fields: ['id', 'firstName', 'lastName', 'pictureUrl'],
    operation: 'updateUser',
    schema: Schema.MEMBER,
    types: {
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

    if (base64String) {
      try {
        pictureUrl = await uploadImage({
          base64String,
          key: 'PROFILE',
          previousImageUrl: db.user?.pictureUrl
        });
      } catch (e) {
        setError('Failed to upload image.');
        return;
      }
    }

    const { error } = await updateUser({ firstName, lastName, pictureUrl });
    if (bio) await updateMember({ bio });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: 'Personal information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
