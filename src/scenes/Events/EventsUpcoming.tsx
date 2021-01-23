import day from 'dayjs';
import React from 'react';

import MainContent from '@containers/Main/MainContent';
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
import EventsHeader from './EventsHeader';
import YourUpcomingEvents from './YourUpcomingEvents';

const EventsUpcomingContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;

    return db.community?.events
      ?.map((eventId: string) => byEventsId[eventId])
      ?.filter((event: IEvent) => day.utc().isBefore(day.utc(event.endTime)))
      ?.filter((event: IEvent) => {
        return !event.guests?.some((guestId: string) =>
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

const EventsUpcoming: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getEvents',
    query: GET_EVENTS,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={EventsHeader}>
      <YourUpcomingEvents />

      <ListStore.Provider>
        <MainSection
          className="s-events-upcoming"
          loading={loading}
          title="Upcoming Events"
        >
          <EventsUpcomingContent />
        </MainSection>
      </ListStore.Provider>
    </MainContent>
  );
};

export default EventsUpcoming;
