import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainContent from '@containers/Main/MainContent';
import Section from '@containers/Section';
import { QueryResult } from '@hooks/useQuery.types';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from '../Events.util';
import EventsCard from '../EventsCard/EventsCard';
import EventsHeader from '../EventsHeader';
import useInitUpcomingEvents from './useInitUpcomingEvents';

const UpcomingEventsContent: React.FC = () => {
  const upcomingEvents: IEvent[] = useStoreState(({ db }) =>
    db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => !event.deletedAt)
      ?.filter((event: IEvent) => getEventTiming(event) !== EventTiming.PAST)
      ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime', 'ASC'))
  );

  return (
    <List
      emptyMessage="Looks like there are no upcoming events."
      items={upcomingEvents}
      options={{ keys: ['title', 'summary', 'description'] }}
      render={EventsCard}
    />
  );
};

const UpcomingEvents: React.FC = () => {
  const { loading }: QueryResult = useInitUpcomingEvents();

  return (
    <MainContent>
      <EventsHeader />

      <Section>
        <LoadingHeader
          h2
          className="mb-sm"
          loading={loading}
          title="Upcoming Events"
        />

        <ListStore.Provider>
          {!loading && <UpcomingEventsContent />}
        </ListStore.Provider>
      </Section>
    </MainContent>
  );
};

export default UpcomingEvents;
