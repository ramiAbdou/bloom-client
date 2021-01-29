import day from 'dayjs';
import React from 'react';

import { MainSection } from '@containers/Main';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventGuest } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import EventsCard from './EventsCard/EventsCard';

const YourUpcomingEventsList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event])
      ?.filter((event: IEvent) => day().isBefore(day(event?.endTime)));
  });

  return (
    <List
      Item={(props) => <EventsCard id={props?.id} />}
      className="s-events-card-ctr"
      items={events}
      options={{ keys: ['title'] }}
    />
  );
};

const YourUpcomingEventsContent: React.FC = () => (
  <ListStore.Provider>
    <MainSection
      className="s-events-section"
      loading={false}
      title="Your RSVP's"
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
      ?.filter((event: IEvent) => day().isBefore(day(event?.endTime)))?.length;
  });

  return hasEvents ? <YourUpcomingEventsContent /> : null;
};

export default YourUpcomingEvents;
