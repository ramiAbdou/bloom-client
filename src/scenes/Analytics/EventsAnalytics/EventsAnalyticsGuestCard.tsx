import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const numGuests: number = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST);

    if (!pastEvents?.length) return null;

    const totalGuests = pastEvents?.reduce(
      (acc: number, event: IEvent) => acc + event?.eventGuests?.length,
      0
    );

    return Math.ceil(totalGuests / pastEvents.length);
  });

  return (
    <GrayCard
      label="Avg # of RSVPs"
      show={numGuests !== null}
      value={numGuests}
    />
  );
};

export default EventsAnalyticsGuestCard;
