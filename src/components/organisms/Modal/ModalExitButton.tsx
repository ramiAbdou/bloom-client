import React from 'react';
import { IoClose } from 'react-icons/io5';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { closeModal, modalVar } from './Modal.state';

const ModalExitButton: React.FC = () => {
  const lock: boolean = useReactiveVar(modalVar)?.options?.lock;

  const onClick = (): void => {
    closeModal();
  };

  return (
    <Button className="c-modal-cancel" show={!lock} onClick={onClick}>
      <IoClose />
    </Button>
  );
};

export default ModalExitButton;