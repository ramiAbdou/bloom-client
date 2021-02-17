import React from 'react';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';

const DeleteEventButton: React.FC = () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const id: string = useStoreState(({ modal }) => modal.metadata);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [deleteEvent, { loading }] = useMutation<boolean, IdProps>({
    fields: ['deletedAt', 'id'],
    operation: 'deleteEvent',
    schema: Schema.EVENT,
    types: { id: { required: true } },
    variables: { id }
  });

  const pushToEvents = usePush('events');

  const onClick = async () => {
    const { error } = await deleteEvent();

    if (!error) {
      showToast({ message: 'Event deleted.' });
      pushToEvents();
      closeModal();
    }
  };

  return (
    <Button
      fill
      large
      red
      secondary
      className="mt-xs"
      loading={loading}
      show={!!id}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
