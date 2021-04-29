import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfilePersonalCardOnboardingContainer: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  if (member.bio && member.pictureUrl) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.UPDATE_PERSONAL_INFORMATION });
  };

  return (
    <Row spacing="xs">
      <Button primary show={!member.pictureUrl} onClick={onClick}>
        + Add Profile Picture
      </Button>

      <Button primary show={!member.bio} onClick={onClick}>
        + Add Bio
      </Button>
    </Row>
  );
};

ProfilePersonalCardOnboardingContainer.fragment = gql`
  fragment ProfilePersonalCardOnboardingContainerFragment on members {
    bio
    pictureUrl
  }
`;

export default ProfilePersonalCardOnboardingContainer;
