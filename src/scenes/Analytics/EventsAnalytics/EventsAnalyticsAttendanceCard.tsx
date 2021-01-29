import day from 'dayjs';
import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const numAttendees: number = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime));

    if (!pastEvents?.length) return null;

    const totalAttendees = pastEvents?.reduce((acc: number, event: IEvent) => {
      return acc + event?.attendees?.length;
    }, 0);

    return Math.ceil(totalAttendees / pastEvents.length);
  });

  return (
    <AnalyticsCard
      label="Average Attendance"
      show={numAttendees !== null}
      value={numAttendees}
    />
  );
};

export default EventsAnalyticsTotalCard;
