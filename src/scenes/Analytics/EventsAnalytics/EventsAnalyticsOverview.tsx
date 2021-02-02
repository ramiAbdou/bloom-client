import React from 'react';

import MainSection from '@containers/Main/MainSection';
import EventsAnalyticsAttendanceCard from './EventsAnalyticsAttendanceCard';
import EventsAnalyticsGuestCard from './EventsAnalyticsGuestCard';
import EventsAnalyticsTotalCard from './EventsAnalyticsTotalCard';
import EventsAnalyticsWatchesCard from './EventsAnalyticsWatchesCard';

const EventsAnalyticsOverview: React.FC = () => {
  return (
    <MainSection className="flex-ac t-row--spacing-sm">
      <EventsAnalyticsTotalCard />
      <EventsAnalyticsAttendanceCard />
      <EventsAnalyticsGuestCard />
      <EventsAnalyticsWatchesCard />
    </MainSection>
  );
};

export default EventsAnalyticsOverview;
