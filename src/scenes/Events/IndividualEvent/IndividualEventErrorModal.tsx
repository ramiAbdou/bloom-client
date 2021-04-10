import day from 'dayjs';
import React from 'react';

import { IEvent } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import ModalCloseButton from '@components/organisms/Modal/ModalCloseButton';
import { useStoreState } from '@store/Store';
import { ErrorType } from '@util/constants.errors';

const IndividualEventErrorModal: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const error:
    | ErrorType.EVENT_FINISHED
    | ErrorType.EVENT_HASNT_STARTED = useStoreState(
    ({ modal }) => modal.metadata
  );

  const { startTime, title }: IEvent = useFindOne(IEvent, {
    fields: ['startTime', 'title'],
    where: { id: eventId }
  });

  const formattedStartTime: string = day(startTime).format('MMMM, D @ h:mm A');

  // If the Event content hasn't fully loaded yet, just wait to show modal.
  if (!startTime || !title) return null;

  return (
    <>
      <h1 className="c-primary mb-sm--nlc">
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `Event Hasn't Started`
          : `Event Finished`}
      </h1>
      <p>
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `${title} is happening on ${formattedStartTime}. You will be able to join 10 minutes before the event starts.`
          : `${title} happened on ${formattedStartTime}.`}
      </p>
      <ModalCloseButton title="Got It" />
    </>
  );
};

export default IndividualEventErrorModal;
