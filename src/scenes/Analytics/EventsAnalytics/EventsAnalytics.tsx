import React from 'react';

import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENTS_WITH_GUESTS } from '../../Events/Events.gql';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';

const EventsAnalytics: React.FC = () => {
  const { loading } = useQuery<IEvent[]>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS_WITH_GUESTS,
    schema: [Schema.EVENT]
  });

  return (
    <Show show={!loading}>
      <EventsAnalyticsOverview />
      <EventsAnalyticsRecentEvents />
      <EventsAnalyticsFrequentAttendees />
    </Show>
  );
};

export default EventsAnalytics;
