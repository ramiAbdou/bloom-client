import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';

const ModalCloseButton: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

export default ModalCloseButton;
