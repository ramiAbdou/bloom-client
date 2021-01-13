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

const ProfileSocialModal: React.FC = () => {
  const facebookUrl = useStoreState(({ db }) => db.user.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.user.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.user.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.user.twitterUrl);

  const updateUser = useUpdateUser();

  return (
    <Modal id={ModalType.EDIT_SOCIAL_MEDIA}>
      <h1>Edit Social Media</h1>

      <Form onSubmit={updateUser}>
        <ModalContentContainer>
          <FormItem
            title="Twitter URL"
            type="SHORT_TEXT"
            validate="IS_URL"
            value={twitterUrl}
          />

          <FormItem
            title="LinkedIn URL"
            type="SHORT_TEXT"
            validate="IS_URL"
            value={linkedInUrl}
          />

          <FormItem
            title="Facebook URL"
            type="SHORT_TEXT"
            validate="IS_URL"
            value={facebookUrl}
          />

          <FormItem
            title="Instagram URL"
            type="SHORT_TEXT"
            validate="IS_URL"
            value={instagramUrl}
          />
        </ModalContentContainer>

        <FormErrorMessage />
        <FormSubmitButton stickToBottom>Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfileSocialModal;
