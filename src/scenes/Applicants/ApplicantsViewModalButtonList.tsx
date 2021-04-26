import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IMember, MemberStatus } from '@util/constants.entities';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsViewModalButtonList: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Row equal spacing="xs">
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

ApplicantsViewModalButtonList.fragment = gql`
  fragment ApplicantsViewModalButtonListFragment on members {
    id
  }
`;

export default ApplicantsViewModalButtonList;
