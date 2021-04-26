import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ApplicantsCardHeaderCreatedAt from './ApplicantsCardHeaderCreatedAt';
import ApplicantsCardHeaderExpandButton from './ApplicantsCardHeaderExpandButton';
import ApplicantsCardHeaderFullName from './ApplicantsCardHeaderFullName';

const ApplicantsCardHeader: ComponentWithFragments<IMember> = ({
  data: member
}) => (
  <Row wrap className="mb-md--nlc" gap="xs" justify="sb">
    <div>
      <ApplicantsCardHeaderCreatedAt data={member} />
      <ApplicantsCardHeaderFullName data={member} />
    </div>

    <ApplicantsCardHeaderExpandButton data={member} />
  </Row>
);

ApplicantsCardHeader.fragment = gql`
  fragment ApplicantsCardHeaderFragment on members {
    ...ApplicantsCardHeaderCreatedAtFragment
    ...ApplicantsCardHeaderExpandButtonFragment
    ...ApplicantsCardHeaderFullNameFragment
  }
  ${ApplicantsCardHeaderCreatedAt.fragment}
  ${ApplicantsCardHeaderExpandButton.fragment}
  ${ApplicantsCardHeaderFullName.fragment}
`;

export default ApplicantsCardHeader;
