import day from 'dayjs';
import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: pastEvents, loading } = useFindFull(IEvent, {
    fields: ['endTime', 'eventWatches.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;

  const eventWatchesCount: number = pastEvents.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventWatches?.length,
    0
  );

  const averageEventWatchesCount: number = Math.ceil(
    eventWatchesCount / pastEvents.length
  );

  return (
    <GrayCard
      label="Avg # of RSVPs"
      show={averageEventWatchesCount !== null}
      value={averageEventWatchesCount}
    />
  );
};

export default EventsAnalyticsGuestCard;
