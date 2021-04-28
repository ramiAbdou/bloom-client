import React from 'react';

import { gql } from '@apollo/client';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipCardHeader: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const onClick = (): void => {
    modalVar({ id: ModalType.UPDATE_MEMBERSHIP_INFORMATION });
  };

  return (
    <ProfileCardHeader
      canEdit
      title={`${member.community.name} Membership Information`}
      onEditClick={onClick}
    />
  );
};

ProfileMembershipCardHeader.fragment = gql`
  fragment ProfileMembershipCardHeaderFragment on members {
    community {
      name
    }
  }
`;

export default ProfileMembershipCardHeader;
