import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfilePersonalCardBio from './ProfilePersonalCardBio';
import ProfilePersonalCardEmail from './ProfilePersonalCardEmail';
import ProfilePersonalCardHeader from './ProfilePersonalCardHeader';
import ProfilePersonalCardOnboardingContainer from './ProfilePersonalCardOnboardingContainer';
import ProfilePersonalCardPicture from './ProfilePersonalCardPicture';
import ProfilePersonalCardTagList from './ProfilePersonalCardTagList';

const ProfilePersonalCard: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Card className="s-profile-card--personal">
    <ProfilePersonalCardPicture data={member} />

    <div className="s-profile-card--personal-main">
      <ProfilePersonalCardHeader data={member} />
      <ProfilePersonalCardTagList data={member} />
      <ProfilePersonalCardEmail data={member} />
      <ProfilePersonalCardBio data={member} />
      <ProfilePersonalCardOnboardingContainer data={member} />
    </div>
  </Card>
);

ProfilePersonalCard.fragment = gql`
  fragment ProfilePersonalCardFragment on members {
    ...ProfilePersonalCardBioFragment
    ...ProfilePersonalCardEmailFragment
    ...ProfilePersonalCardHeaderFragment
    ...ProfilePersonalCardOnboardingContainerFragment
    ...ProfilePersonalCardPictureFragment
    ...ProfilePersonalCardTagListFragment
  }
  ${ProfilePersonalCardBio.fragment}
  ${ProfilePersonalCardEmail.fragment}
  ${ProfilePersonalCardHeader.fragment}
  ${ProfilePersonalCardOnboardingContainer.fragment}
  ${ProfilePersonalCardPicture.fragment}
  ${ProfilePersonalCardTagList.fragment}
`;

export default ProfilePersonalCard;
