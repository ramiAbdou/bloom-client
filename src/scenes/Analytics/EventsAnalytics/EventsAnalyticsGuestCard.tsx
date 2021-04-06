import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const pastEvents: IEvent[] = useFind(IEvent, {
    fields: ['endTime', 'eventGuests.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

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
