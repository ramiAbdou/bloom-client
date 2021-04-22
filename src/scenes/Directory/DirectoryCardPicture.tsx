import React from 'react';

import { gql } from '@apollo/client';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const DirectoryCardPicture: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <ProfilePicture
    circle={false}
    firstName={member.firstName}
    fontSize={60}
    lastName={member.lastName}
    pictureUrl={member.pictureUrl}
  />
);

DirectoryCardPicture.fragment = gql`
  fragment DirectoryCardPictureFragment on members {
    firstName
    lastName
    pictureUrl
  }
`;

export default DirectoryCardPicture;
