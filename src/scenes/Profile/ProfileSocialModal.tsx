import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormHeader from '@organisms/Form/FormHeader';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { useStoreState } from '@store/Store';
import useUpdateUserSocials from './useUpdateUserSocials';

const ProfileSocialForm: React.FC = () => {
  const facebookUrl = useStoreState(({ db }) => db.user.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.user.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.user.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.user.twitterUrl);

  const updateUserSocials = useUpdateUserSocials();

  return (
    <Form onSubmit={updateUserSocials}>
      <FormHeader title="Edit Social Media" />

      <FormShortText
        id="TWITTER_URL"
        required={false}
        title="Twitter URL"
        validate="IS_URL"
        value={twitterUrl}
      />

      <FormShortText
        id="LINKED_IN_URL"
        required={false}
        title="LinkedIn URL"
        validate="IS_URL"
        value={linkedInUrl}
      />

      <FormShortText
        id="FACEBOOK_URL"
        required={false}
        title="Facebook URL"
        validate="IS_URL"
        value={facebookUrl}
      />

      <FormShortText
        id="INSTAGRAM_URL"
        required={false}
        title="Instagram URL"
        validate="IS_URL"
        value={instagramUrl}
      />

      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

const ProfileSocialModal: React.FC = () => {
  return (
    <Modal id={ModalType.EDIT_SOCIAL_MEDIA}>
      <ProfileSocialForm />
    </Modal>
  );
};

export default ProfileSocialModal;
