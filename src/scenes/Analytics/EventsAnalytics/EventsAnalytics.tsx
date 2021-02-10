import React from 'react';

import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENTS } from '../../Events/Events.gql';
import {
  GET_PAST_EVENT_ATTENDEES,
  GET_PAST_EVENT_GUESTS,
  GET_PAST_EVENT_WATCHES
} from '../Analytics.gql';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';

const EventsAnalytics: React.FC = () => {
  const { loading: loading1 } = useQuery({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery({
    name: 'getPastEventAttendees',
    query: GET_PAST_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading3 } = useQuery({
    name: 'getPastEventGuests',
    query: GET_PAST_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST]
  });

  const { loading: loading4 } = useQuery({
    name: 'getPastEventWatches',
    query: GET_PAST_EVENT_WATCHES,
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
