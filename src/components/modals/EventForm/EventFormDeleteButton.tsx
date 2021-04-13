import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { ModalType } from '@util/constants';

const DeleteEventButton: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);
  // const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = (): void => {
    showModal({
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
