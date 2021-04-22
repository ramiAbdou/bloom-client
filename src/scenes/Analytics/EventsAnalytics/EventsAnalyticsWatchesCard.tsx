import day from 'dayjs';
import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import useFind from '@core/gql/hooks/useFind';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsGuestCard: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: pastEvents, loading } = useFind(IEvent, {
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
