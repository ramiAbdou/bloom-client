import React from 'react';

import { gql } from '@apollo/client';
import { IMember } from '@util/db.entities';
import { ComponentWithFragments } from '@util/constants';

const DirectoryCardPosition: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <span className="body--bold c-primary d-block fs-13 mb-xxs ta-center">
    {member.position}
  </span>
);

DirectoryCardPosition.fragments = {
  data: gql`
    fragment DirectoryCardPositionFragment on members {
      position
    }
  `
};

export default DirectoryCardPosition;
