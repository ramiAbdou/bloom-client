import gql from 'graphql-tag';
import React from 'react';

import { IMember } from '@util/db.entities';
import { ComponentWithFragments } from '@util/constants';

const DirectoryCardFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const fullName: string = `${member?.firstName} ${member?.lastName}`;

  return (
    <span className="body--bold d-block mb-xxs ta-center">{fullName}</span>
  );
};

DirectoryCardFullName.fragments = {
  data: gql`
    fragment DirectoryCardFullNameFragment on members {
      firstName
      lastName
    }
  `
};

export default DirectoryCardFullName;
