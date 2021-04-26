import React from 'react';

import { gql } from '@apollo/client';
import Section from '@components/containers/Section';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAnalyticsRecentEventsTable from './EventsAnalyticsRecentEventsTable';

const EventsAnalyticsRecentEventsSection: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => (
  <Section>
    <h2 className="mb-sm">Recent Events</h2>
    <EventsAnalyticsRecentEventsTable data={events} />
  </Section>
);

EventsAnalyticsRecentEventsSection.fragment = gql`
  fragment EventsAnalyticsRecentEventsSectionFragment on events {
    ...EventsAnalyticsRecentEventsTableFragment
  }
  ${EventsAnalyticsRecentEventsTable.fragment}
`;

export default EventsAnalyticsRecentEventsSection;
