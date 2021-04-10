import React from 'react';

import Row from '@components/containers/Row/Row';
import Section from '@components/containers/Section';
import EventsAnalyticsAttendanceCard from './EventsAnalyticsAttendanceCard';
import EventsAnalyticsGuestCard from './EventsAnalyticsGuestCard';
import EventsAnalyticsTotalCard from './EventsAnalyticsTotalCard';
import EventsAnalyticsWatchesCard from './EventsAnalyticsWatchesCard';

const EventsAnalyticsOverview: React.FC = () => (
  <Section>
    <Row wrap gap="xs">
      <EventsAnalyticsTotalCard />
      <EventsAnalyticsAttendanceCard />
      <EventsAnalyticsGuestCard />
      <EventsAnalyticsWatchesCard />
    </Row>
  </Section>
);

export default EventsAnalyticsOverview;
