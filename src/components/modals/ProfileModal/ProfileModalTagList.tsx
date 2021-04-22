import React from 'react';

import { gql } from '@apollo/client';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileModalTagList: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Row wrap className="mb-ss--nlc" gap="xs">
    <HeaderTag show={!!member.role}>{member.role}</HeaderTag>
    <HeaderTag show={!!member.position}>{member.position}</HeaderTag>
    <HeaderTag>{member.memberType?.name}</HeaderTag>
  </Row>
);

ProfileModalTagList.fragments = {
  data: gql`
    fragment ProfileModalTagListFragment on members {
      role
      position

      memberType {
        name
      }
    }
  `
};

export default ProfileModalTagList;
