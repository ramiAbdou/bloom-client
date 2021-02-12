import React from 'react';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { useStoreActions, useStoreState } from '@store/Store';

const DeleteEventButton: React.FC = () => {
  const communityId = useStoreState(({ db }) => db.community.id);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const id: string = useStoreState(({ modal }) => modal.metadata);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [deleteEvent, { loading }] = useMutation<boolean, IdProps>({
    deleteArgs: {
      ids: [id],
      refs: [{ column: 'events', id: communityId, table: 'communities' }],
      table: 'events'
    },
    operation: 'deleteEvent',
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
