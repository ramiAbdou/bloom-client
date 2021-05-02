import React from 'react';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { modalVar, showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';

const UpdateEventModalFormDeleteButton: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onClick = (): void => {
    showModal({
      id: ModalType.CONFIRM_DELETE_EVENT,
      metadata: eventId
    });
  };

  return (
    <Button fill large red secondary className="mt-xs" onClick={onClick}>
      Delete Event
    </Button>
  );
};

export default UpdateEventModalFormDeleteButton;