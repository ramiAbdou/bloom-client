import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainContent from '@containers/Main/MainContent';
import Section from '@containers/Section';
import { IEvent } from '@db/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import useFindFull from '@gql/hooks/useFindFull';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from './Events.util';
import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';

const UpcomingEventsContent: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const events = useFind(IEvent, {
    fields: ['deletedAt', 'endTime', 'startTime'],
    where: { id: communityId }
  });

  const upcomingEvents: IEvent[] = events
    ?.filter((event: IEvent) => !event.deletedAt)
    ?.filter((event: IEvent) => getEventTiming(event) !== EventTiming.PAST)
    ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime', 'ASC'));

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
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading }: QueryResult = useFindFull(IEvent, {
    fields: [
      'community.id',
      'endTime',
      'eventGuests.createdAt',
      'eventGuests.id',
      'eventGuests.member.id',
      'eventGuests.member.firstName',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.id',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.lastName',
      'id',
      'imageUrl',
      'startTime',
      'title',
      'videoUrl'
    ],
    where: { communityId, startTime: { _gt: day.utc().format() } }
  });

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
