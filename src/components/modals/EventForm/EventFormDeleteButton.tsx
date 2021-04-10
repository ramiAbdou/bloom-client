import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@components/atoms/Button/Button';
import { ICommunity, IEvent } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import GQL from '@gql/GQL';
// import useBloomMutation from '@gql/hooks/useBloomMutation';
import useFindOne from '@gql/hooks/useFindOne';
import useGQL from '@gql/hooks/useGQL';
// import { MutationEvent } from '@util/constants.events';
import { now } from '@util/util';

const DeleteEventButton: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const eventId: string = useStoreState(({ modal }) => modal.metadata);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const { urlName } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  const gql: GQL = useGQL();

  // const [deleteEvent, { loading }] = useBloomMutation<boolean>({
  //   fields: ['deletedAt', 'id'],
  //   operation: MutationEvent.DELETE_EVENT,
  //   types: { eventId: { required: true } },
  //   variables: { eventId }
  // });

  const { push } = useHistory();

  const onClick = async (): Promise<void> => {
    const { error } = await gql.update(IEvent, {
      data: { deletedAt: now() },
      where: { id: eventId }
    });
    // const { error } = await deleteEvent();

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
      // loading={loading}
      show={!!eventId}
      onClick={onClick}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
