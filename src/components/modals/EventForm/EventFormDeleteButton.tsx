import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import { ICommunity } from '@db/db.entities';
import useBloomMutation from '@gql/useBloomMutation';
import useFindOne from '@gql/useFindOne';
import { useStoreActions, useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const DeleteEventButton: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const eventId: string = useStoreState(({ modal }) => modal.metadata);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const { urlName } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  const [deleteEvent, { loading }] = useBloomMutation<boolean>({
    fields: ['deletedAt', 'id'],
    operation: MutationEvent.DELETE_EVENT,
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
