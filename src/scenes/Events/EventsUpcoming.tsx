import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Scene from '@components/containers/Scene';
import Section from '@components/containers/Section';
import { IEvent } from '@util/constants.entities';
import { now } from '@util/util';
import EventsCard from './EventsCard';
import EventsHeader from './EventsHeader';
import EventsUpcomingList from './EventsUpcomingList';

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
    $isUpcoming: Boolean! = true
  ) {
    communityId @client @export(as: "communityId")

    getEvents {
      id
      eventAttendees {
        id

        member {
          firstName
        }
      }
    }

    events(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        startTime: { _gt: $currentTimestamp }
      }
      order_by: { startTime: asc }
    ) {
      id
      ...EventsCardFragment
    }
  }
  ${EventsCard.fragment}
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
    <Scene>
      <EventsHeader loading={loading} />

      <Section>
        <h2 className="mb-sm">Upcoming Events</h2>
        {events && <EventsUpcomingList events={events} />}
      </Section>
    </Scene>
  );
};

export default EventsUpcoming;
