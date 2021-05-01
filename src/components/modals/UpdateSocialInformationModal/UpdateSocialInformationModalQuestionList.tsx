import React from 'react';

import { gql } from '@apollo/client';
import FormShortText from '@components/organisms/Form/FormShortText';
import { ComponentWithFragments } from '@util/constants';
import { IMemberSocials } from '@util/constants.entities';

const UpdateSocialInformationModalQuestionList: ComponentWithFragments<IMemberSocials> = ({
  data: memberSocials
}) => (
  <ul>
    <FormShortText
      id="LINKED_IN_URL"
      required={false}
      title="LinkedIn URL"
      validate="IS_URL"
      value={memberSocials.linkedInUrl}
    />

    <FormShortText
      id="TWITTER_URL"
      required={false}
      title="Twitter URL"
      validate="IS_URL"
      value={memberSocials.twitterUrl}
    />

    <FormShortText
      id="FACEBOOK_URL"
      required={false}
      title="Facebook URL"
      validate="IS_URL"
      value={memberSocials.facebookUrl}
    />

    <FormShortText
      id="INSTAGRAM_URL"
      required={false}
      title="Instagram URL"
      validate="IS_URL"
      value={memberSocials.instagramUrl}
    />
  </ul>
);

UpdateSocialInformationModalQuestionList.fragment = gql`
  fragment UpdateSocialInformationModalQuestionListFragment on members_socials {
    linkedInUrl
    twitterUrl
    facebookUrl
    instagramUrl
  }
`;

export default UpdateSocialInformationModalQuestionList;
