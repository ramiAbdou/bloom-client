import React from 'react';

import Button from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const DeleteEventButton: React.FC = () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const eventId: string = useStoreState(({ modal }) => modal.metadata);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [deleteEvent, { loading }] = useMutation<boolean>({
    fields: ['deletedAt', 'id'],
    operation: MutationEvent.DELETE_EVENT,
    schema: Schema.EVENT,
    types: { eventId: { required: true } },
    variables: { eventId }
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
      show={!!eventId}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
