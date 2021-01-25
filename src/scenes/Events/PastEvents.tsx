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
import { sortObjects } from '@util/util';
import { GET_PAST_EVENTS } from './Events.gql';
import EventsCard from './EventsCard';
import EventsHeader from './EventsHeader';
import YourPastEvents from './YourPastEvents';

const EventsPastContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    const attendees = new Set(db.member.attendees);

    return db.community?.events
      ?.map((eventId: string) => byEventsId[eventId])
      ?.filter((event: IEvent) => day.utc().isAfter(day.utc(event.endTime)))
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
  const { data, loading } = useQuery<ICommunity>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  console.log(data);

  return (
    <MainContent Header={EventsHeader}>
      <YourPastEvents />

      <ListStore.Provider>
        <MainSection
          className="s-events-section"
          loading={loading}
          title="Past Events"
        >
          <EventsPastContent />
        </MainSection>
      </ListStore.Provider>
    </MainContent>
  );
};

export default EventsPast;
