import React from 'react';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_EVENT } from './CreateEvent.gql';

const DeleteEventButton: React.FC<IdProps> = ({ id }) => {
  const communityId = useStoreState(({ db }) => db.community.id);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [deleteEvent, { loading }] = useMutation<boolean, IdProps>({
    deleteArgs: {
      ids: [id],
      refs: [{ column: 'events', id: communityId, table: 'communities' }],
      table: 'events'
    },
    name: 'deleteEvent',
    query: DELETE_EVENT,
    variables: { id }
  });

  const pushToEvents = usePush('events');

  const onClick = async () => {
    await deleteEvent();
    showToast({ message: 'Event deleted.' });
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
