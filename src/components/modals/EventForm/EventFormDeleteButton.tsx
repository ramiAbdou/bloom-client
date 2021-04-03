import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import useBloomMutation from '@gql/useBloomMutation';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const DeleteEventButton: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);
  const urlName: string = useStoreState(({ db }) => db.community?.urlName);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [deleteEvent, { loading }] = useBloomMutation<boolean>({
    fields: ['deletedAt', 'id'],
    operation: MutationEvent.DELETE_EVENT,
    schema: Schema.EVENT,
    types: { eventId: { required: true } },
    variables: { eventId }
  });

  const { push } = useHistory();

  const onClick = async (): Promise<void> => {
    const { error } = await deleteEvent();

    if (!error) {
      showToast({ message: 'Event deleted.' });
      push(`/${urlName}/events`);
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
