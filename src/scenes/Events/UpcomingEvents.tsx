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

const UpcomingEventsContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    return db.community?.events?.map((eventId: string) => byEventsId[eventId]);
  });

  return (
    <>
      <ListSearchBar placeholder="Search events..." />

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
    <ListStore.Provider>
      <MainSection
        className="s-events-upcoming"
        loading={loading}
        title="Upcoming Events"
      >
        <UpcomingEventsContent />
      </MainSection>
    </ListStore.Provider>
  );
};

export default UpcomingEvents;
