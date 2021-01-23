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

const EventsPastContent: React.FC = () => {
  const events: IEvent[] = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;

    return db.community?.events
      ?.map((eventId: string) => byEventsId[eventId])
      ?.filter((event: IEvent) => day.utc().isAfter(day.utc(event.endTime)))
      ?.filter((event: IEvent) => {
        return !event.guests?.some((guestId: string) =>
          new Set(db.member.guests).has(guestId)
        );
      });
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
    name: 'getEvents',
    query: GET_EVENTS,
    schema: Schema.COMMUNITY
  });

  return (
    <MainContent Header={EventsHeader}>
      <ListStore.Provider>
        <MainSection
          className="s-events-upcoming"
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
