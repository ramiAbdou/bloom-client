import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/db.entities';

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
