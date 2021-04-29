import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ApplicantsCardHeaderExpandButton: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = (): void => {
    showModal({ id: ModalType.VIEW_APPLICANT, metadata: member.id });
  };

  return (
    <Button tertiary onClick={onClick}>
      {isMobile ? 'See Full' : 'See Full Application'}
    </Button>
  );
};

ApplicantsCardHeaderExpandButton.fragment = gql`
  fragment ApplicantsCardHeaderExpandButtonFragment on members {
    id
  }
`;

export default ApplicantsCardHeaderExpandButton;
