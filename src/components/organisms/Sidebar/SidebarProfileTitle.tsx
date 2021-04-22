import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const SidebarProfileTitle: ComponentWithFragments<IMember> = ({
  data: member
}) => <p>{member.position ?? member.role ?? member.memberType?.name}</p>;

SidebarProfileTitle.fragments = {
  data: gql`
    fragment SidebarProfileTitleFragment on members {
      position
      role

      memberType {
        name
      }
    }
  `
};

export default SidebarProfileTitle;
