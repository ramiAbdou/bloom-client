import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainContent from '@containers/Main/MainContent';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { ICommunity, IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { GET_UPCOMING_EVENTS } from './Events.gql';
import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';

const EventsUpcomingContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;

    return db.community?.events
      ?.map((eventId: string) => byEventId[eventId])
      ?.filter((event: IEvent) => day().isBefore(day(event.endTime)))
      ?.sort((a, b) => sortObjects(a, b, 'startTime'));
  });

  return (
    <>
      {!events?.length && <p>Looks like there are no upcoming events.</p>}

      <List
        Item={EventsCard}
        className="s-events-card-ctr"
        items={events}
        options={{ keys: ['title'] }}
      />
    </>
  );
};

const EventsUpcoming: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getUpcomingEvents',
    query: GET_UPCOMING_EVENTS,
    schema: [Schema.EVENT]
  });

  return (
    <MainContent>
      <EventsHeader />

      <MainSection className="s-events-section">
        <LoadingHeader h2 loading={loading} title="Upcoming Events" />
        <ListStore.Provider>
          {!loading && <EventsUpcomingContent />}
        </ListStore.Provider>
      </MainSection>
    </MainContent>
  );
};

export default EventsUpcoming;
