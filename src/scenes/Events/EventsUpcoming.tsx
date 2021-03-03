import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainContent from '@containers/Main/MainContent';
import MainSection from '@containers/Main/MainSection';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';
import useInitUpcomingEvents from './useInitUpcomingEvents';

const EventsUpcomingContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    return db.community?.events
      ?.map((eventId: string) => db.byEventId[eventId])
      ?.filter((event: IEvent) => !event.deletedAt)
      ?.filter((event: IEvent) => day().isBefore(day(event.endTime)))
      ?.sort((a, b) => sortObjects(a, b, 'startTime', 'ASC'));
  });

  return (
    <List
      emptyMessage="Looks like there are no upcoming events."
      items={events}
      options={{ keys: ['title'] }}
      render={EventsCard}
    />
  );
};

const EventsUpcoming: React.FC = () => {
  const loading = useInitUpcomingEvents();

  return (
    <MainContent>
      <EventsHeader />

      <MainSection>
        <LoadingHeader h2 loading={loading} title="Upcoming Events" />
        <ListStore.Provider>
          {!loading && <EventsUpcomingContent />}
        </ListStore.Provider>
      </MainSection>
    </MainContent>
  );
};

export default EventsUpcoming;
