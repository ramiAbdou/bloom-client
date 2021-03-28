import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const numAttendees: number = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => {
        return db.byEventId[eventId];
      })
      ?.filter((event: IEvent) => {
        return day().isAfter(event.endTime);
      });

    if (!pastEvents?.length) return null;

    const totalAttendees = pastEvents?.reduce((acc: number, event: IEvent) => {
      return event?.attendees ? acc + event?.attendees?.length : acc;
    }, 0);

    return Math.ceil(totalAttendees / pastEvents.length);
  });

  return (
    <GrayCard
      label="Avg # of Attendees"
      show={numAttendees !== null}
      value={numAttendees}
    />
  );
};

export default EventsAnalyticsTotalCard;
