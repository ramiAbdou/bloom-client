import day from 'dayjs';
import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ApplicantsCardHeaderCreatedAt: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const formattedCreatedAt: string = day(member.createdAt).format('M/D/YY');
  return <p className="c-gray-2 mb-xxs meta">Applied {formattedCreatedAt}</p>;
};

ApplicantsCardHeaderCreatedAt.fragment = gql`
  fragment ApplicantsCardHeaderCreatedAtFragment on members {
    createdAt
  }
`;

export default ApplicantsCardHeaderCreatedAt;
