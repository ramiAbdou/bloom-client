import React from 'react';

import Show from '@containers/Show';
import { QueryResult } from '@hooks/useQuery.types';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';
import EventsAnalyticsTopEventGoers from './EventsAnalyticsTopEventGoers';
import useInitEventAnalytics from './useInitEventAnalytics';

const EventsAnalytics: React.FC = () => {
  const { loading }: Partial<QueryResult> = useInitEventAnalytics();

  return (
    <Show show={!loading}>
      <EventsAnalyticsOverview />
      <EventAnalyticsChart />
      <EventsAnalyticsRecentEvents />
      <EventsAnalyticsTopEventGoers />
    </Show>
  );
};

export default EventsAnalytics;
