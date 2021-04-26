import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ApplicantsCardHeaderFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => <h3>{member.fullName}</h3>;

ApplicantsCardHeaderFullName.fragment = gql`
  fragment ApplicantsCardHeaderFullNameFragment on members {
    fullName
  }
`;

export default ApplicantsCardHeaderFullName;
