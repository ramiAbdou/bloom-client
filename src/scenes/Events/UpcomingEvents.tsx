import React from 'react';

import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { ICommunity, IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { GET_EVENTS } from './Events.gql';
import EventsCard from './EventsCard';
import YourUpcomingEvents from './YourUpcomingEvents';

const UpcomingEventsContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;

    return db.community?.events
      ?.map((eventId: string) => byEventsId[eventId])
      ?.filter((event: IEvent) => {
        return !event.guests.some((guestId: string) =>
          new Set(db.member.guests).has(guestId)
        );
      });
  });

  return (
    <>
      {!!events?.length && <ListSearchBar placeholder="Search events..." />}
      {!events?.length && <p>Looks like there are no upcoming events.</p>}

      <List
        className="s-events-card-ctr"
        columnWidth={300}
        items={events}
        options={{ keys: ['title'] }}
        render={EventsCard}
      />
    </>
  );
};

const UpcomingEvents: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getEvents',
    query: GET_EVENTS,
    schema: Schema.COMMUNITY
  });

  return (
    <>
      <YourUpcomingEvents />

      <ListStore.Provider>
        <MainSection
          className="s-events-upcoming"
          loading={loading}
          title="Upcoming Events"
        >
          <UpcomingEventsContent />
        </MainSection>
      </ListStore.Provider>
    </>
  );
};

export default UpcomingEvents;
