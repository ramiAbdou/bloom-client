import React from 'react';

import { gql } from '@apollo/client';
import MailTo from '@components/molecules/MailTo';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileModalEmail: ComponentWithFragments<IMember> = ({
  data: member
}) => <MailTo className="mb-sm--nlc" email={member.email} />;

ProfileModalEmail.fragments = {
  data: gql`
    fragment ProfileModalEmailFragment on members {
      email
    }
  `
};

export default ProfileModalEmail;
