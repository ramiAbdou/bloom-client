import React from 'react';

import { gql } from '@apollo/client';
import MailTo from '@components/molecules/MailTo';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfilePersonalCardEmail: ComponentWithFragments<IMember> = ({
  data: member
}) => <MailTo email={member.email} />;

ProfilePersonalCardEmail.fragment = gql`
  fragment ProfilePersonalCardEmailFragment on members {
    email
  }
`;

export default ProfilePersonalCardEmail;
