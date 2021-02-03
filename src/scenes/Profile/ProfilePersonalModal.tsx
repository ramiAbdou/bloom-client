import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormHeader from '@organisms/Form/FormHeader';
import FormImage from '@organisms/Form/FormImage';
import FormLongText from '@organisms/Form/FormLongText';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { useStoreState } from '@store/Store';
import useUpdateUser from './useUpdateUser';

const ProfilePersonalForm: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  const firstName = useStoreState(({ db }) => db.user.firstName);
  const lastName = useStoreState(({ db }) => db.user.lastName);
  const pictureUrl = useStoreState(({ db }) => db.user.pictureUrl);

  const updateUser = useUpdateUser();

  return (
    <Form onSubmit={updateUser}>
      <FormHeader title="Edit Personal Information" />
      <FormImage id="profilePicture" value={pictureUrl} />

      <FormShortText
        category="FIRST_NAME"
        title="First Name"
        value={firstName}
      />

      <FormShortText category="LAST_NAME" title="Last Name" value={lastName} />
      <FormLongText id="bio" required={false} title="Bio" value={bio} />
      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

const ProfilePersonalModal: React.FC = () => {
  return (
    <Modal id={ModalType.EDIT_PERSONAL_INFORMATION}>
      <ProfilePersonalForm />
    </Modal>
  );
};

export default ProfilePersonalModal;
