import React from 'react';

import Form from '@organisms/Form/Form';
import FormHeader from '@organisms/Form/FormHeader';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import useUpdateMemberSocials from './useUpdateMemberSocials';

const ProfileSocialModal: React.FC = () => {
  const facebookUrl = useStoreState(({ db }) => db.socials?.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.socials?.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.socials?.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.socials?.twitterUrl);

  const updateMemberSocials = useUpdateMemberSocials();

  return (
    <Form onSubmit={updateMemberSocials}>
      <FormHeader title="Edit Social Media" />

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
        id="TWITTER_URL"
        required={false}
        title="Twitter URL"
        validate="IS_URL"
        value={twitterUrl}
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

export default ProfileSocialModal;
