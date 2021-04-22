import day from 'dayjs';
import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { IEvent } from '@util/db.entities';
import useFind from '@core/gql/hooks/useFind';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

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
