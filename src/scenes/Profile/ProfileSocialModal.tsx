import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IMemberSocials } from '@core/db/db.entities';
import useFindOneFull from '@core/gql/hooks/useFindOneFull';
import { useStoreState } from '@core/store/Store';
import useUpdateMemberSocials from './useUpdateMemberSocials';

const ProfileSocialModal: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const updateMemberSocials: OnFormSubmitFunction = useUpdateMemberSocials();

  const { data: memberSocials, loading } = useFindOneFull(IMemberSocials, {
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    where: { memberId }
  });

  if (loading) return null;

  return (
    <Form onSubmit={updateMemberSocials}>
      <FormHeader title="Edit Social Media" />

      <FormShortText
        id="LINKED_IN_URL"
        required={false}
        title="LinkedIn URL"
        validate="IS_URL"
        value={memberSocials.linkedInUrl}
      />

      <FormShortText
        id="FACEBOOK_URL"
        required={false}
        title="Facebook URL"
        validate="IS_URL"
        value={memberSocials.facebookUrl}
      />

      <FormShortText
        id="TWITTER_URL"
        required={false}
        title="Twitter URL"
        validate="IS_URL"
        value={memberSocials.twitterUrl}
      />

      <FormShortText
        id="INSTAGRAM_URL"
        required={false}
        title="Instagram URL"
        validate="IS_URL"
        value={memberSocials.instagramUrl}
      />

      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

export default ProfileSocialModal;
