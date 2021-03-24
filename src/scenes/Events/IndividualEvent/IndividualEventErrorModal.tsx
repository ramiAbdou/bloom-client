import day from 'dayjs';
import React from 'react';

import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import { useStoreState } from '@store/Store';
import { ErrorType } from '@util/constants.errors';

const IndividualEventErrorModal: React.FC = () => {
  const error:
    | ErrorType.EVENT_FINISHED
    | ErrorType.EVENT_HASNT_STARTED = useStoreState(
    ({ modal }) => modal.metadata
  );

  const startTime = useStoreState(({ db }) => {
    return day(db.event?.startTime).format('MMMM, D @ h:mm A');
  });

  const title = useStoreState(({ db }) => db.event?.title);

  return (
    <>
      <h1 className="c-primary mb-sm--nlc">
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `Event Hasn't Started`
          : `Event Finished`}
      </h1>
      <p>
        {error === ErrorType.EVENT_HASNT_STARTED
          ? `${title} is happening on ${startTime}. You will be able to join 10 minutes before the event starts.`
          : `${title} happened on ${startTime}.`}
      </p>
      <ModalCloseButton title="Got It" />
    </>
  );
};

export default IndividualEventErrorModal;
