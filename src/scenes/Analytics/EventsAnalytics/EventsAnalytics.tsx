import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IEvent } from '@util/constants.entities';
import { now } from '@util/util';
import AnalyticsHeader from '../AnalyticsHeader';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsOverviewSection from './EventsAnalyticsOverviewSection';
import EventsAnalyticsRecentEventsSection from './EventsAnalyticsRecentEventsSection';
import EventsAnalyticsTopGoersSection from './EventsAnalyticsTopGoersSection';

interface GetEventsAnalyticsArgs {
  currentTimestamp: string;
}

interface GetEventsAnalyticsResult {
  events: IEvent[];
}

const GET_EVENTS_ANALYTICS: DocumentNode = gql`
  query GetEventsAnalytics($communityId: String!, $currentTimestamp: String!) {
    communityId @client @export(as: "communityId")

    events(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        endTime: { _lt: $currentTimestamp }
      }
      order_by: { startTime: desc }
    ) {
      id
      ...EventsAnalyticsOverviewSectionFragment
      ...EventsAnalyticsRecentEventsSectionFragment
      ...EventsAnalyticsTopGoersSectionFragment
    }
  }
  ${EventsAnalyticsOverviewSection.fragment}
  ${EventsAnalyticsRecentEventsSection.fragment}
  ${EventsAnalyticsTopGoersSection.fragment}
`;

const EventsAnalyticsEmptyMessage: React.FC = () => (
  <p>To see Events analytics, you need to host an event first! 😜</p>
);

const EventsAnalytics: React.FC = () => {
  const { data, loading } = useQuery<
    GetEventsAnalyticsResult,
    GetEventsAnalyticsArgs
  >(GET_EVENTS_ANALYTICS, { variables: { currentTimestamp: now() } });

  const events: IEvent[] = data?.events;

  return (
    <>
      <AnalyticsHeader loading={loading} />
      {events?.length === 0 && <EventsAnalyticsEmptyMessage />}
      {!!events?.length && <EventsAnalyticsOverviewSection data={events} />}
      <EventAnalyticsChart />
      {!!events?.length && <EventsAnalyticsRecentEventsSection data={events} />}
      {!!events?.length && <EventsAnalyticsTopGoersSection data={events} />}
    </>
  );
};

export default EventsAnalytics;
