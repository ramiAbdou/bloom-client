import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const pastEvents: IEvent[] = useFind(IEvent, {
    fields: ['endTime', 'eventWatches.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

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
