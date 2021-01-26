import React from 'react';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { useStoreActions } from '@store/Store';
import { DELETE_EVENT } from './CreateEvent.gql';

const DeleteEventButton: React.FC<IdProps> = ({ id }) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [deleteEvent, { loading }] = useMutation<boolean, IdProps>({
    name: 'deleteEvent',
    query: DELETE_EVENT,
    variables: { id }
  });

  const pushToEvents = usePush('events');

  const onClick = async () => {
    await deleteEvent();
    showToast({ message: 'Event has been deleted.' });
    pushToEvents();
    closeModal();
  };

  return (
    <Button
      fill
      large
      red
      secondary
      className="mo-create-event-delete"
      loading={loading}
      show={!!id}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
