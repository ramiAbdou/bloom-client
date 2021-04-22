import React from 'react';

import { gql } from '@apollo/client';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import { IMember } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';

const DirectoryCardRole: ComponentWithFragments<IMember> = ({
  data: member
}) => <HeaderTag show={!!member.role}>{member.role}</HeaderTag>;

DirectoryCardRole.fragments = {
  data: gql`
    fragment DirectoryCardRoleFragment on members {
      role
    }
  `
};

export default DirectoryCardRole;