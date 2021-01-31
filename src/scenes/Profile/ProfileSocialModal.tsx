import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
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
        <FormShortText
          title="Twitter URL"
          validate="IS_URL"
          value={twitterUrl}
        />

        <FormShortText
          title="LinkedIn URL"
          validate="IS_URL"
          value={linkedInUrl}
        />

        <FormShortText
          title="Facebook URL"
          validate="IS_URL"
          value={facebookUrl}
        />

        <FormShortText
          title="Instagram URL"
          validate="IS_URL"
          value={instagramUrl}
        />

        <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfileSocialModal;
