import day from 'dayjs';
import React from 'react';

import ModalCloseButton from '@components/organisms/Modal/ModalCloseButton';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreState } from '@core/store/Store';
import { ErrorType } from '@util/constants.errors';

const IndividualEventErrorModal: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const error:
    | ErrorType.EVENT_FINISHED
    | ErrorType.EVENT_HASNT_STARTED = useStoreState(
    ({ modal }) => modal.metadata
  );

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['startTime', 'title'],
    where: { id: eventId }
  });

  if (loading) return null;

  const formattedStartTime: string = day(event.startTime).format(
    'MMMM, D @ h:mm A'
  );

  return (
    <>
      <h1 className="c-primary mb-sm--nlc">
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `Event Hasn't Started`
          : `Event Finished`}
      </h1>
      <p>
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `${event.title} is happening on ${formattedStartTime}. You will be able to join 10 minutes before the event starts.`
          : `${event.title} happened on ${formattedStartTime}.`}
      </p>
      <ModalCloseButton title="Got It" />
    </>
  );
};

export default IndividualEventErrorModal;
