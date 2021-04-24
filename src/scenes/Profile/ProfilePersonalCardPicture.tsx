import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { modalVar } from '@core/state/Modal.reactive';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalCardPicture: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_PERSONAL_INFORMATION });
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
