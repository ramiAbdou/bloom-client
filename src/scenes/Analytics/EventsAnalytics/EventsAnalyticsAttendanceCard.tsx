import day from 'dayjs';
import React from 'react';

import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@core/db/db.entities';
import useFind from '@core/gql/hooks/useFind';
import { useStoreState } from '@core/store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: pastEvents, loading } = useFind(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;

  const attendeesCount: number = pastEvents.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventAttendees?.length,
    0
  );

  const averageAttendeesCount: number = Math.ceil(
    attendeesCount / pastEvents.length
  );

  return (
    <GrayCard
      label="Avg # of Attendees"
      show={averageAttendeesCount !== null}
      value={averageAttendeesCount}
    />
  );
};

export default EventsAnalyticsTotalCard;
