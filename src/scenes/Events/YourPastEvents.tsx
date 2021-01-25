import day from 'dayjs';
import React from 'react';

import { MainSection } from '@containers/Main';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventGuest } from '@store/entities';
import { useStoreState } from '@store/Store';
import EventsCard from './EventsCard';

const YourPastEventsList: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event])
      ?.filter((event: IEvent) => day.utc().isAfter(day.utc(event?.endTime)));
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

const YourPastEventsContent: React.FC = () => (
  <ListStore.Provider>
    <MainSection
      className="s-events-section"
      loading={false}
      title="Your Past Events"
    >
      <YourPastEventsList />
    </MainSection>
  </ListStore.Provider>
);

const YourPastEvents: React.FC = () => {
  const hasEvents: boolean = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return !!db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event])
      ?.filter((event: IEvent) => day.utc().isAfter(day.utc(event?.endTime)))
      ?.length;
  });

  return hasEvents ? <YourPastEventsContent /> : null;
};

export default YourPastEvents;
