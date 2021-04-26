import React from 'react';

import { gql } from '@apollo/client';
import Section from '@components/containers/Section';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsAnalyticsTopGoersTable from './EventsAnalyticsTopGoersTable';

const EventsAnalyticsTopGoersSection: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => (
  <Section>
    <h2 className="mb-sm">Top Event Goers</h2>
    <EventsAnalyticsTopGoersTable data={events} />
  </Section>
);

EventsAnalyticsTopGoersSection.fragment = gql`
  fragment EventsAnalyticsTopGoersSectionFragment on events {
    ...EventsAnalyticsTopGoersTableFragment
  }
  ${EventsAnalyticsTopGoersTable.fragment}
`;

export default EventsAnalyticsTopGoersSection;
