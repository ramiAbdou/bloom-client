import React from 'react';

import { GQL } from '@gql/gql.types';
import useGQL from '@gql/useGQL';
import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import useUpdateMemberSocials from './useUpdateMemberSocials';

const ProfileSocialModal: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql: GQL = useGQL();

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  } = gql.memberSocials.fromCache({
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    id: memberSocialsId
  });

  const updateMemberSocials: OnFormSubmitFunction = useUpdateMemberSocials();

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
