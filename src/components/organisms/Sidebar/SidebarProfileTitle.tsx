import React from 'react';

import { gql } from '@apollo/client';
import { IMember } from '@util/db.entities';
import { ComponentWithFragments } from '@util/constants';

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
