import React from 'react';

import Button from '@atoms/Button/Button';
import ModalStore from './Modal.store';

const ModalCloseButton: React.FC = () => {
  const closeModal = ModalStore.useStoreActions((store) => store.closeModal);
  const onClick = () => closeModal();

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

export default ModalCloseButton;
