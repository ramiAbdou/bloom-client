import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileSocialCardHeader from './ProfileSocialCardHeader';
import ProfileSocialCardOnboardingContainer from './ProfileSocialCardOnboardingContainer';
import ProfileSocialCardValueList from './ProfileSocialCardValueList';

const ProfileSocialCard: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Card className="s-profile-card--social">
    <ProfileSocialCardHeader data={member.memberSocials} />
    <ProfileSocialCardValueList data={member.memberSocials} />
    <ProfileSocialCardOnboardingContainer data={member} />
  </Card>
);

ProfileSocialCard.fragment = gql`
  fragment ProfileSocialCardFragment on members {
    ...ProfileSocialCardHeaderFragment
    ...ProfileSocialCardOnboardingContainerFragment
    ...ProfileSocialCardValueListFragment
  }
  ${ProfileSocialCardHeader.fragment}
  ${ProfileSocialCardOnboardingContainer.fragment}
  ${ProfileSocialCardValueList.fragment}
`;

export default ProfileSocialCard;
