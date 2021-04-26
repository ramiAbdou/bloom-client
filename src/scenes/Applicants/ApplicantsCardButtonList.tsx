import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IMember, MemberStatus } from '@util/constants.entities';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsCardButtonList: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Row equal className="mt-auto" spacing="xs">
    <ApplicantsRespondButton
      applicantIds={[member.id]}
      response={MemberStatus.ACCEPTED}
    />

    <ApplicantsRespondButton
      applicantIds={[member.id]}
      response={MemberStatus.REJECTED}
    />
  </Row>
);

ApplicantsCardButtonList.fragment = gql`
  fragment ApplicantsCardButtonListFragment on members {
    id
  }
`;

export default ApplicantsCardButtonList;
