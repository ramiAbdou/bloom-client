import React from 'react';

import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ComponentWithData, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileMembershipCardOnboardingButton: ComponentWithData<IMember> = ({
  data: member
}) => {
  if (member?.memberValues?.length) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.UPDATE_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

export default ProfileMembershipCardOnboardingButton;
