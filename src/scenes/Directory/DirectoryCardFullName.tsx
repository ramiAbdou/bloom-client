import gql from 'graphql-tag';
import React from 'react';

import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const DirectoryCardFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const fullName: string = `${member?.firstName} ${member?.lastName}`;

  return (
    <span className="body--bold d-block mb-xxs ta-center">{fullName}</span>
  );
};

DirectoryCardFullName.fragment = gql`
  fragment DirectoryCardFullNameFragment on members {
    firstName
    lastName
  }
`;

export default DirectoryCardFullName;
