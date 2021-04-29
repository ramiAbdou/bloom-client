import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import ApplicantsRespondButton from '@scenes/Applicants/ApplicantsRespondButton';
import { ComponentWithFragments } from '@util/constants';
import { IMember, MemberStatus } from '@util/constants.entities';

const ViewApplicantModalButtonList: ComponentWithFragments<IMember> = ({
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

ViewApplicantModalButtonList.fragment = gql`
  fragment ViewApplicantModalButtonListFragment on members {
    id
  }
`;

export default ViewApplicantModalButtonList;
