import day from 'dayjs';
import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import MainContent from '@components/containers/Main/MainContent';
import Section from '@components/containers/Section';
import { IEvent } from '@util/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import { sortObjects } from '@util/util';
import { EventTiming, getEventTiming } from './Events.util';
import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';

const UpcomingEventsContent: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: events, loading } = useFind(IEvent, {
    fields: ['deletedAt', 'endTime', 'startTime'],
    where: { communityId }
  });

  if (loading) return null;

  const upcomingEvents: IEvent[] = events
    ?.filter((event: IEvent) => !event.deletedAt)
    ?.filter((event: IEvent) => getEventTiming(event) !== EventTiming.PAST)
    ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime', 'ASC'));

  return null;
  // return (
  //   <List
  //     emptyMessage="Looks like there are no upcoming events."
  //     items={upcomingEvents}
  //     options={{ keys: ['title', 'summary', 'description'] }}
  //     render={EventsCard}
  //   />
  // );
};

const UpcomingEvents: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { loading }: QueryResult = useFind(IEvent, {
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

        {!loading && <UpcomingEventsContent />}
      </Section>
    </MainContent>
  );
};

export default UpcomingEvents;
