import React from 'react';

import Button from '@components/atoms/Button/Button';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import { TitleProps } from '@util/constants';

const ModalCloseButton: React.FC<TitleProps> = ({ title }) => {
  const onClick = (): void => {
    closeModal();
  };

  return (
    <Button secondary onClick={onClick}>
      {title ?? 'Cancel'}
    </Button>
  );
};

export default ModalCloseButton;
