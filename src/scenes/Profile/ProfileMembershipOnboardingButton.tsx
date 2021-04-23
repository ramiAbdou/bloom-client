import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileMembershipOnboardingButton: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  if (!member?.memberValues?.length) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

ProfileMembershipOnboardingButton.fragment = gql`
  fragment ProfileMembershipOnboardingButtonFragment on members {
    memberValues {
      id
    }
  }
`;

export default ProfileMembershipOnboardingButton;
