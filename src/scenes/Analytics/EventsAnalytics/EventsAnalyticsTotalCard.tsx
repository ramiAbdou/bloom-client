import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@db/db.entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const pastEventsCount: number = useStoreState(
    ({ db }) =>
      db.community.events
        ?.map((eventId: string) => db.byEventId[eventId])
        ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
        ?.length
  );

  return (
    <GrayCard
      label="Events Hosted"
      show={pastEventsCount !== null}
      value={pastEventsCount}
    />
  );
};

export default EventsAnalyticsTotalCard;
