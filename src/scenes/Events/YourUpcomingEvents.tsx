import day from 'dayjs';
import React from 'react';

import { MainSection } from '@containers/Main';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventGuest } from '@store/entities';
import { useStoreState } from '@store/Store';
import EventsCard from './EventsCard';

const YourUpcomingEventsList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event])
      ?.filter((event: IEvent) => day.utc().isBefore(day.utc(event?.endTime)));
  });

  return (
    <List
      Item={(props) => <EventsCard guest {...props} />}
      className="s-events-card-ctr"
      items={events}
      options={{ keys: ['title'] }}
    />
  );
};

const YourUpcomingEventsContent: React.FC = () => (
  <ListStore.Provider>
    <MainSection
      className="s-events-upcoming"
      loading={false}
      title="Your Upcoming Events"
    >
      <YourUpcomingEventsList />
    </MainSection>
  </ListStore.Provider>
);

const YourUpcomingEvents: React.FC = () => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return !!db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event])
      ?.filter((event: IEvent) => day.utc().isBefore(day.utc(event?.endTime)))
      ?.length;
  });

  return hasEvents ? <YourUpcomingEventsContent /> : null;
};

export default YourUpcomingEvents;
