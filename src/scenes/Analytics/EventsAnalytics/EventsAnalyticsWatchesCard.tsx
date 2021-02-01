import day from 'dayjs';
import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsWatchesCard: React.FC = () => {
  const numViews: number = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime))
      ?.filter((event: IEvent) => !!event.recordingUrl);

    if (!pastEvents?.length) return null;

    const totalWatches = pastEvents?.reduce((acc: number, event: IEvent) => {
      return acc + event?.watches?.length;
    }, 0);

    return Math.ceil(totalWatches / pastEvents.length);
  });

  return (
    <AnalyticsCard
      label="Avg # of Recording Viewers"
      show={numViews !== null}
      value={numViews}
    />
  );
};

export default EventsAnalyticsWatchesCard;
