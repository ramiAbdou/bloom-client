import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments, SocialBrand } from '@util/constants';
import { IMemberSocials } from '@util/constants.entities';
import ProfileSocialValue from './ProfileSocialValue';

const ProfileSocialCardValueList: ComponentWithFragments<IMemberSocials> = ({
  data: memberSocials
}) => (
  <div>
    <ProfileSocialValue
      brand={SocialBrand.LINKED_IN}
      url={memberSocials.linkedInUrl}
    />

    <ProfileSocialValue
      brand={SocialBrand.TWITTER}
      url={memberSocials.twitterUrl}
    />

    <ProfileSocialValue
      brand={SocialBrand.FACEBOOK}
      url={memberSocials.facebookUrl}
    />

    <ProfileSocialValue
      brand={SocialBrand.INSTAGRAM}
      url={memberSocials.instagramUrl}
    />
  </div>
);

ProfileSocialCardValueList.fragment = gql`
  fragment ProfileSocialCardValueListFragment on memberSocials {
    facebookUrl
    instagramUrl
    linkedInUrl
    twitterUrl
  }
`;

export default ProfileSocialCardValueList;
