import React from 'react';

import Button from '@atoms/Button/Button';
import { TitleProps } from '@constants';
import { useStoreActions } from '@store/Store';

const ModalCloseButton: React.FC<TitleProps> = ({ title }) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <Button secondary onClick={onClick}>
      {title ?? 'Cancel'}
    </Button>
  );
};

export default ModalCloseButton;
