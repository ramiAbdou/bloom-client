import React from 'react';

import { gql } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';

const ProfilePersonalCardHeader: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const onClick = (): void => {
    showModal({ id: ModalType.UPDATE_PERSONAL_INFORMATION });
  };

  return (
    <ProfileCardHeader
      canEdit
      h2
      title={member.fullName}
      onEditClick={onClick}
    />
  );
};

ProfilePersonalCardHeader.fragment = gql`
  fragment ProfilePersonalCardHeaderFragment on members {
    fullName
  }
`;

export default ProfilePersonalCardHeader;
