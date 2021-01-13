import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { useStoreState } from '@store/Store';
import useUpdateUser from './useUpdateUser';

const ProfileMembershipModal: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  const firstName = useStoreState(({ db }) => db.user.firstName);
  const lastName = useStoreState(({ db }) => db.user.lastName);

  const updateUser = useUpdateUser();

  return (
    <Modal id={ModalType.EDIT_MEMBERSHIP_INFORMATION}>
      <h1>Edit Membership Information</h1>

      <Form onSubmit={updateUser}>
        <ModalContentContainer>
          <FormItem
            required
            category="FIRST_NAME"
            title="First Name"
            type="SHORT_TEXT"
            value={firstName}
          />

          <FormItem
            required
            category="LAST_NAME"
            title="Last Name"
            type="SHORT_TEXT"
            value={lastName}
          />

          <FormItem id="bio" title="Bio" type="LONG_TEXT" value={bio} />
        </ModalContentContainer>

        <FormErrorMessage />
        <FormSubmitButton stickToBottom>Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfileMembershipModal;
