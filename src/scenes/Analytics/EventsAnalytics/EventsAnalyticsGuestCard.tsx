import day from 'dayjs';
import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: pastEvents, loading } = useFindFull(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;

  const eventGuestsCount: number = pastEvents.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventGuests?.length,
    0
  );

  const averageEventGuestsCount: number = Math.ceil(
    eventGuestsCount / pastEvents.length
  );

  return (
    <GrayCard
      label="Avg # of RSVPs"
      show={averageEventGuestsCount !== null}
      value={averageEventGuestsCount}
    />
  );
};

export default EventsAnalyticsGuestCard;
