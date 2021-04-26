import gql from 'graphql-tag';
import React from 'react';

import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAnalyticsAverageAttendanceCard from './EventsAnalyticsAverageAttendanceCard';
import EventsAnalyticsAverageGuestCard from './EventsAnalyticsAverageGuestCard';
import EventsAnalyticsAverageWatchesCard from './EventsAnalyticsAverageWatchesCard';
import EventsAnalyticsTotalEventsCard from './EventsAnalyticsTotalEventsCard';

const EventsAnalyticsOverviewSection: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => (
  <Section>
    <Row wrap gap="xs">
      <EventsAnalyticsTotalEventsCard data={events} />
      <EventsAnalyticsAverageAttendanceCard data={events} />
      <EventsAnalyticsAverageGuestCard data={events} />
      <EventsAnalyticsAverageWatchesCard data={events} />
    </Row>
  </Section>
);

EventsAnalyticsOverviewSection.fragment = gql`
  fragment EventsAnalyticsOverviewSectionFragment on events {
    ...EventsAnalyticsAverageAttendanceCardFragment
    ...EventsAnalyticsAverageGuestCardFragment
    ...EventsAnalyticsAverageWatchesCardFragment
    ...EventsAnalyticsTotalEventsCardFragment
  }
  ${EventsAnalyticsAverageAttendanceCard.fragment}
  ${EventsAnalyticsAverageGuestCard.fragment}
  ${EventsAnalyticsAverageWatchesCard.fragment}
  ${EventsAnalyticsTotalEventsCard.fragment}
`;

export default EventsAnalyticsOverviewSection;
