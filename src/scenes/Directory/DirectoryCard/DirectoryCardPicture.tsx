import React from 'react';

import { gql } from '@apollo/client';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { IMember } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';

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

DirectoryCardPicture.fragments = {
  data: gql`
    fragment DirectoryCardPictureFragment on members {
      firstName
      lastName
      pictureUrl
    }
  `
};

export default DirectoryCardPicture;
