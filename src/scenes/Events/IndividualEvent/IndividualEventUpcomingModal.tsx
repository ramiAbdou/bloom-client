import day from 'dayjs';
import React from 'react';

import ModalCloseButton from '@organisms/Modal/ModalCloseButton';
import { useStoreState } from '@store/Store';

const IndividualEventUpcomingModal: React.FC = () => {
  const startTime = useStoreState(({ db }) => {
    return day(db.event?.startTime).format('MMMM, D @ h:mm A');
  });

  const title = useStoreState(({ db }) => db.event?.title);

  return (
    <>
      <h1 className="c-primary mb-sm">Event Hasn't Started</h1>
      <p>
        {title} is happening at {startTime}. You will be able to join 10 minutes
        before the event starts.
      </p>
      <ModalCloseButton title="Got It" />
    </>
  );
};

export default IndividualEventUpcomingModal;
