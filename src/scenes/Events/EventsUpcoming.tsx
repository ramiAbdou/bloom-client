import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import MainContent from '@components/containers/Main/MainContent';
import Section from '@components/containers/Section';
import { IEvent } from '@util/constants.entities';
import { now } from '@util/util';
// import { EventTiming, getEventTiming } from './Events.util';
// import EventsCard from './EventsCard/EventsCard';
import EventsHeader from './EventsHeader';
import EventsUpcomingList from './EventsUpcomingList';

// const EventsUpcomingContent: React.FC = () => {
//   const communityId: string = useReactiveVar(communityIdVar);

//   const { data: events, loading } = useFind(IEvent, {
//     fields: ['deletedAt', 'endTime', 'startTime'],
//     where: { communityId }
//   });

//   if (loading) return null;

//   const upcomingEvents: IEvent[] = events
//     ?.filter((event: IEvent) => !event.deletedAt)
//     ?.filter((event: IEvent) => getEventTiming(event) !== EventTiming.PAST)
//     ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime', 'ASC'));

//   return null;
//   // return (
//   //   <List
//   //     emptyMessage="Looks like there are no upcoming events."
//   //     items={upcomingEvents}
//   //     options={{ keys: ['title', 'summary', 'description'] }}
//   //     render={EventsCard}
//   //   />
//   // );
// };

interface GetEventsUpcomingByCommunityIdArgs {
  currentTimestamp: string;
}

interface GetEventsUpcomingByCommunityIdResult {
  events: IEvent[];
}

const GET_EVENTS_UPCOMING_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetEventsUpcomingByCommunityId(
    $communityId: String!
    $currentTimestamp: String!
  ) {
    communityId @client @export(as: "communityId")

    events(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        startTime: { _gt: $currentTimestamp }
      }
      order_by: { startTime: asc }
    ) {
      id
    }
  }
`;

const EventsUpcoming: React.FC = () => {
  const { data, loading } = useQuery<
    GetEventsUpcomingByCommunityIdResult,
    GetEventsUpcomingByCommunityIdArgs
  >(GET_EVENTS_UPCOMING_BY_COMMUNITY_ID, {
    fetchPolicy: 'network-only',
    variables: { currentTimestamp: now() }
  });

  const events: IEvent[] = data?.events;

  return (
    <MainContent>
      <EventsHeader loading={loading} />

      <Section>
        <LoadingHeader
          h2
          className="mb-sm"
          loading={loading}
          title="Upcoming Events"
        />

        {events && <EventsUpcomingList events={events} />}
      </Section>
    </MainContent>
  );
};

export default EventsUpcoming;
