import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/Loading/LoadingHeader';
import MainContent from '@containers/Main/MainContent';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { ICommunity, IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { GET_PAST_EVENTS } from './Events.gql';
import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';
import YourPastEvents from './YourPastEvents';

const EventsPastContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const attendees = new Set(db.member.attendees);

    return db.community?.events
      ?.map((eventId: string) => byEventsId[eventId])
      ?.filter((event: IEvent) => day().isAfter(day(event.endTime)))
      ?.filter((event: IEvent) => {
        return !event.attendees?.some((attendeeId: string) =>
          attendees.has(attendeeId)
        );
      })
      ?.sort((a, b) => sortObjects(a, b, 'startTime', 'DESC'));
  });

  return (
    <>
      {!!events?.length && <ListSearchBar placeholder="Search events..." />}
      {!events?.length && <p>Looks like there are no past events.</p>}

      <List
        Item={EventsCard}
        className="s-events-card-ctr"
        items={events}
        options={{ keys: ['title'] }}
      />
    </>
  );
};

const EventsPast: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  return (
    <MainContent>
      <EventsHeader loading={loading} />
      <YourPastEvents />

      <MainSection className="s-events-section">
        <LoadingHeader h2 loading={loading} title="Past Events" />

        <ListStore.Provider>
          <EventsPastContent />
        </ListStore.Provider>
      </MainSection>
    </MainContent>
  );
};

export default EventsPast;
