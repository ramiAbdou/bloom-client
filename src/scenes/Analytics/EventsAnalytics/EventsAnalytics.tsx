import React from 'react';

import Show from '@containers/Show';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';
import useInitEventAnalytics from './useInitEventAnalytics';

const EventsAnalytics: React.FC = () => {
  const loading = useInitEventAnalytics();

  return (
    <Show show={!loading}>
      <EventsAnalyticsOverview />
      <EventAnalyticsChart />
      <EventsAnalyticsRecentEvents />
      <EventsAnalyticsFrequentAttendees />
    </Show>
  );
};

export default EventsAnalytics;
