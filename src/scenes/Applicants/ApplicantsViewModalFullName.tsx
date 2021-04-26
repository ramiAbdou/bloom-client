import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ApplicantsViewModalFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => <h1>{member.fullName}</h1>;

ApplicantsViewModalFullName.fragment = gql`
  fragment ApplicantsViewModalFullNameFragment on members {
    fullName
  }
`;

export default ApplicantsViewModalFullName;
