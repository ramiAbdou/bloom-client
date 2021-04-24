import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfilePersonalCardBio: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  if (!member.bio) return null;
  return <p className="ws-pre-wrap">{member.bio}</p>;
};

ProfilePersonalCardBio.fragment = gql`
  fragment ProfilePersonalCardBioFragment on members {
    bio
  }
`;

export default ProfilePersonalCardBio;
