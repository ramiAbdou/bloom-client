import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const DirectoryCardPosition: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <span className="body--bold c-primary d-block fs-13 mb-xxs ta-center">
    {member.position}
  </span>
);

DirectoryCardPosition.fragment = gql`
  fragment DirectoryCardPositionFragment on members {
    position
  }
`;

export default DirectoryCardPosition;
