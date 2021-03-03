import React from 'react';

import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import EventsAnalyticsAttendanceCard from './EventsAnalyticsAttendanceCard';
import EventsAnalyticsGuestCard from './EventsAnalyticsGuestCard';
import EventsAnalyticsTotalCard from './EventsAnalyticsTotalCard';
import EventsAnalyticsWatchesCard from './EventsAnalyticsWatchesCard';

const EventsAnalyticsOverview: React.FC = () => {
  return (
    <MainSection>
      <Row wrap gap="xs">
        <EventsAnalyticsTotalCard />
        <EventsAnalyticsAttendanceCard />
        <EventsAnalyticsGuestCard />
        <EventsAnalyticsWatchesCard />
      </Row>
    </MainSection>
  );
};

export default EventsAnalyticsOverview;
