import React from 'react';

import { gql } from '@apollo/client';
import { IMember } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';

const SidebarProfileName: ComponentWithFragments<IMember> = ({
  data: member
}) => <p>{member.fullName}</p>;

SidebarProfileName.fragments = {
  data: gql`
    fragment SidebarProfileNameFragment on members {
      fullName
    }
  `
};

export default SidebarProfileName;
