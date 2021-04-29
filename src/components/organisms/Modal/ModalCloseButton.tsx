import React from 'react';

import Button from '@components/atoms/Button/Button';
import { closeModal } from '@components/organisms/Modal/Modal.state';

interface ModalCloseButtonProps {
  title?: string;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ title }) => {
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
