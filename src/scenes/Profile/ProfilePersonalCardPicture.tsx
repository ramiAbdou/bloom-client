import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalCardPicture: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = (): void => {
    showModal({ id: ModalType.UPDATE_PERSONAL_INFORMATION });
  };

  return (
    <Row justify="sb">
      <ProfilePicture
        firstName={member.firstName}
        fontSize={36}
        lastName={member.lastName}
        pictureUrl={member.pictureUrl}
        size={isMobile ? 84 : 104}
      />
      <ProfileEditButton canEdit onEditClick={onClick} />
    </Row>
  );
};

ProfilePersonalCardPicture.fragment = gql`
  fragment ProfilePersonalCardPictureFragment on members {
    firstName
    lastName
    pictureUrl
  }
`;

export default ProfilePersonalCardPicture;
