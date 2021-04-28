import React from 'react';

import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithData, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileMembershipCardOnboardingButton: ComponentWithData<IMember> = ({
  data: member
}) => {
  if (member?.memberValues?.length) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.UPDATE_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

export default ProfileMembershipCardOnboardingButton;
