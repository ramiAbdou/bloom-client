import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const numPastEvents: number = useStoreState(
    ({ db }) =>
      db.community.events
        ?.map((eventId: string) => db.byEventId[eventId])
        ?.filter((event: IEvent) => day().isAfter(event.endTime))?.length
  );

  return (
    <GrayCard
      label="Events Hosted"
      show={numPastEvents !== null}
      value={numPastEvents}
    />
  );
};

export default EventsAnalyticsTotalCard;
