import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { uploadImage } from '@util/imageUtil';
import {
  UPDATE_MEMBER_BIO,
  UPDATE_USER,
  UpdateMemberArgs,
  UpdateUserArgs
} from './Profile.gql';

const useUpdateUser = (): OnFormSubmit => {
  const [updateMember] = useMutation<IMember, UpdateMemberArgs>({
    name: 'updateMember',
    query: UPDATE_MEMBER_BIO,
    schema: Schema.MEMBER
  });

  const [updateUser] = useMutation<IMember, UpdateUserArgs>({
    name: 'updateUser',
    query: UPDATE_USER,
    schema: Schema.MEMBER
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
