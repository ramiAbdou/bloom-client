import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@db/Db.entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsWatchesCard: React.FC = () => {
  const numViews: number = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
      ?.filter((event: IEvent) => !!event.recordingUrl);

    if (!pastEvents?.length) return null;

    const totalWatches = pastEvents?.reduce(
      (acc: number, event: IEvent) => acc + event?.eventWatches?.length,
      0
    );

    return Math.ceil(totalWatches / pastEvents.length);
  });

  return (
    <GrayCard
      label="Avg # of Recording Viewers"
      show={numViews !== null}
      value={numViews}
    />
  );
};

export default EventsAnalyticsWatchesCard;
