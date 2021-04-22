import React from 'react';

import { gql } from '@apollo/client';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const SidebarProfilePicture: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <ProfilePicture
    firstName={member.firstName}
    lastName={member.lastName}
    pictureUrl={member.pictureUrl}
    size={48}
  />
);

SidebarProfilePicture.fragment = gql`
  fragment SidebarProfilePictureFragment on members {
    firstName
    lastName
    pictureUrl
  }
`;

export default SidebarProfilePicture;
