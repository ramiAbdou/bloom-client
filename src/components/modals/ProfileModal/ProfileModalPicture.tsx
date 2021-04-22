import React from 'react';

import { gql } from '@apollo/client';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileModalPicture: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <ProfilePicture
    className="mb-xs--nlc"
    firstName={member.firstName}
    fontSize={36}
    lastName={member.lastName}
    pictureUrl={member.pictureUrl}
    size={96}
  />
);

ProfileModalPicture.fragment = gql`
  fragment ProfileModalPictureFragment on members {
    firstName
    lastName
    pictureUrl
  }
`;

export default ProfileModalPicture;
