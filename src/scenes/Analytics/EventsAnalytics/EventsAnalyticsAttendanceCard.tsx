import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/Db.entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsTotalCard: React.FC = () => {
  const numAttendees: number = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST);

    if (!pastEvents?.length) return null;

    const totalAttendees = pastEvents?.reduce(
      (acc: number, event: IEvent) =>
        event?.eventAttendees ? acc + event?.eventAttendees?.length : acc,
      0
    );

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
