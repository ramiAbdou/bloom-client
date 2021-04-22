import React from 'react';

import { gql } from '@apollo/client';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { IMember } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';

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

SidebarProfilePicture.fragments = {
  data: gql`
    fragment SidebarProfilePictureFragment on members {
      firstName
      lastName
      pictureUrl
    }
  `
};

export default SidebarProfilePicture;
