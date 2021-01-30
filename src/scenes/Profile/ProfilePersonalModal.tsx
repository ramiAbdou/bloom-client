import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { useStoreState } from '@store/Store';
import FormLongText from '../../components/organisms/Form/FormLongText';
import useUpdateUser from './useUpdateUser';

const ProfilePersonalModal: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  const firstName = useStoreState(({ db }) => db.user.firstName);
  const lastName = useStoreState(({ db }) => db.user.lastName);
  const pictureUrl = useStoreState(({ db }) => db.user.pictureUrl);

  const updateUser = useUpdateUser();

  return (
    <Modal id={ModalType.EDIT_PERSONAL_INFORMATION}>
      <h1>Edit Personal Information</h1>

      <Form onSubmit={updateUser}>
        <FormItem id="profilePicture" type="IMAGE" value={pictureUrl} />

        <FormShortText
          category="FIRST_NAME"
          title="First Name"
          value={firstName}
        />

        <FormShortText
          category="LAST_NAME"
          title="Last Name"
          value={lastName}
        />

        <FormLongText id="bio" title="Bio" value={bio} />

        <FormErrorMessage />
        <FormSubmitButton>Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfilePersonalModal;
