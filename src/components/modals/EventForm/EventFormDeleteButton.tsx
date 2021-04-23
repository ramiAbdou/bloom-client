import React from 'react';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';

const DeleteEventButton: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const onClick = (): void => {
    modalVar({
      id: ModalType.CONFIRM_DELETE_EVENT,
      metadata: eventId,
      options: { confirmation: true }
    });
  };

  return (
    <Button
      fill
      large
      red
      secondary
      className="mt-xs"
      show={!!eventId}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
