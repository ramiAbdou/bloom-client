import React from 'react';

import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { baseEventFields, eventFields } from '@scenes/Events/Events.types';
import { Schema } from '@store/Db/schema';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';

const EventsAnalytics: React.FC = () => {
  const { loading: loading1 } = useQuery({
    fields: [
      'description',
      'endTime',
      'eventUrl',
      'id',
      'imageUrl',
      'private',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: 'getPastEvents',
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery({
    fields: eventFields,
    operation: 'getPastEventAttendees',
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading3 } = useQuery({
    fields: eventFields,
    operation: 'getPastEventGuests',
    schema: [Schema.EVENT_GUEST]
  });

  const { loading: loading4 } = useQuery({
    fields: baseEventFields,
    operation: 'getPastEventWatches',
    schema: [Schema.EVENT_WATCH]
  });

  const loading = loading1 || loading2 || loading3 || loading4;

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
