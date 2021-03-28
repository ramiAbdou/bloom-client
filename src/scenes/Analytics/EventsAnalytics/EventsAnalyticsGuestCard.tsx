import day from 'dayjs';
import React from 'react';

import GrayCard from '@containers/Card/GrayCard';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventsAnalyticsGuestCard: React.FC = () => {
  const numGuests: number = useStoreState(({ db }) => {
    const pastEvents: IEvent[] = db.community.events
      ?.map((eventId: string) => {
        return db.byEventId[eventId];
      })
      ?.filter((event: IEvent) => {
        return day().isAfter(event.endTime);
      });

    if (!pastEvents?.length) return null;

    const totalGuests = pastEvents?.reduce((acc: number, event: IEvent) => {
      return acc + event?.guests?.length;
    }, 0);

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
