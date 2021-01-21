import React from 'react';

import { MainSection } from '@containers/Main';
import useQuery from '@hooks/useQuery';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent, IEventGuest } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { GET_MEMBER_UPCOMING_EVENTS } from './Events.gql';
import EventsCard from './EventsCard';

const YourUpcomingEventsContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const { byId: byGuestsId } = db.entities.guests;

    return db.member.guests
      ?.map((guestId: string) => byGuestsId[guestId])
      ?.map((guest: IEventGuest) => byEventsId[guest.event]);
  });

  return (
    <List
      className="s-events-card-ctr"
      columnWidth={300}
      items={events}
      options={{ keys: ['title'] }}
      render={(props) => <EventsCard guest {...props} />}
    />
  );
};

const YourUpcomingEvents: React.FC = () => {
  const hasRSVPs = useStoreState(({ db }) => !!db.member.guests?.length);

  const { loading } = useQuery<IEventGuest[]>({
    name: 'getMemberUpcomingEvents',
    query: GET_MEMBER_UPCOMING_EVENTS,
    schema: [Schema.EVENT_GUEST]
  });

  if (!hasRSVPs) return null;

  return (
    <ListStore.Provider>
      <MainSection
        className="s-events-upcoming"
        loading={loading}
        title="Your Upcoming Events"
      >
        <YourUpcomingEventsContent />
      </MainSection>
    </ListStore.Provider>
  );
};

export default YourUpcomingEvents;
