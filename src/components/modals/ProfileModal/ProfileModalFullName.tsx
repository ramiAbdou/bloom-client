import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileModalFullName: ComponentWithFragments<IMember> = ({
  data: member
}) => <h1 className="mb-xs--nlc">{member.fullName}</h1>;

ProfileModalFullName.fragments = {
  data: gql`
    fragment ProfileModalFullNameFragment on members {
      fullName
    }
  `
};

export default ProfileModalFullName;
