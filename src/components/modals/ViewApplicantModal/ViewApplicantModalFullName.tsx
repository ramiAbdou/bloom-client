import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ViewApplicantModalFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => <h1>{member.fullName}</h1>;

ViewApplicantModalFullName.fragment = gql`
  fragment ViewApplicantModalFullNameFragment on members {
    fullName
  }
`;

export default ViewApplicantModalFullName;
