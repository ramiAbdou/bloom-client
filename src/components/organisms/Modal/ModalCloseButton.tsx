import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useStoreActions } from '@store/Store';
import { TitleProps } from '@util/constants';

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
