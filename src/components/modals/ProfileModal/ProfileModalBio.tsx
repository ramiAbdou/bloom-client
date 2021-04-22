import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileModalBio: ComponentWithFragments<IMember> = ({ data: member }) => (
  <p className="mb-sm--nlc ws-pre-wrap">{member.bio}</p>
);

ProfileModalBio.fragment = gql`
  fragment ProfileModalBioFragment on members {
    bio
  }
`;

export default ProfileModalBio;
