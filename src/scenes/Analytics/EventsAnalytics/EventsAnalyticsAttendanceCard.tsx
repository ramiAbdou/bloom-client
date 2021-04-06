import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@db/db.entities';
import useFind from '@gql/useFind';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const pastEvents: IEvent[] = useFind(IEvent, {
    fields: ['endTime', 'eventAttendees.id', 'startTime'],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

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
