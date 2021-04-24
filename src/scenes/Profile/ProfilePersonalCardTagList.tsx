import React from 'react';

import { gql } from '@apollo/client';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfilePersonalCardTagList: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Row wrap gap="xs">
    {member.role && <HeaderTag>{member.role}</HeaderTag>}
    <HeaderTag>{member.memberType.name}</HeaderTag>
  </Row>
);

ProfilePersonalCardTagList.fragment = gql`
  fragment ProfilePersonalCardTagListFragment on members {
    role

    memberType {
      id
      name
    }
  }
`;

export default ProfilePersonalCardTagList;
