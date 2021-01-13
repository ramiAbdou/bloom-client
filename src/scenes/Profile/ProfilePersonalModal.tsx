import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { useStoreState } from '@store/Store';

const ProfilePersonalModal: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  const firstName = useStoreState(({ db }) => db.user.firstName);
  const lastName = useStoreState(({ db }) => db.user.lastName);

  return (
    <Modal id={ModalType.EDIT_PERSONAL_INFORMATION}>
      <h1>Edit Personal Information</h1>

      <Form>
        <ModalContentContainer>
          <FormItem category="FIRST_NAME" type="SHORT_TEXT" value={firstName} />
          <FormItem category="LAST_NAME" type="SHORT_TEXT" value={lastName} />
          <FormItem id="bio" title="Bio" type="LONG_TEXT" value={bio} />
        </ModalContentContainer>

        <FormSubmitButton stickToBottom>Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfilePersonalModal;
