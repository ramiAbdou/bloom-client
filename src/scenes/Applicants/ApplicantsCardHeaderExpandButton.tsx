import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.reactive';
import useBreakpoint from '@hooks/useBreakpoint';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ApplicantsCardHeaderExpandButton: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = (): void => {
    modalVar({ id: ModalType.VIEW_APPLICANT, metadata: member.id });
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
