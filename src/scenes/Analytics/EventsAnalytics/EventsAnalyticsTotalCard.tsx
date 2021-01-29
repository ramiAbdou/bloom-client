import day from 'dayjs';
import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const numPastEvents: number = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    return db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime))?.length;
  });

  return (
    <AnalyticsCard
      label="Events Hosted"
      show={numPastEvents !== null}
      value={numPastEvents}
    />
  );
};

export default EventsAnalyticsTotalCard;
