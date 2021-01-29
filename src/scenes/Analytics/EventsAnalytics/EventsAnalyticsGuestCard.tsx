import day from 'dayjs';
import React from 'react';

import AnalyticsCard from '@containers/Card/AnalyticsCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const numGuests: number = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isAfter(event.endTime));

    if (!pastEvents?.length) return null;

    const totalGuests = pastEvents?.reduce((acc: number, event: IEvent) => {
      return acc + event?.guests?.length;
    }, 0);

    return Math.ceil(totalGuests / pastEvents.length);
  });

  return (
    <AnalyticsCard
      label="Avg # of RSVPs"
      show={numGuests !== null}
      value={numGuests}
    />
  );
};

export default EventsAnalyticsGuestCard;
