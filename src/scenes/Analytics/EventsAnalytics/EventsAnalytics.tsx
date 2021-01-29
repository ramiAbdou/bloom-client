import React from 'react';

import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENTS } from '../../Events/Events.gql';
import EventsAnalyticsAttendanceCard from './EventsAnalyticsAttendanceCard';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsTopEvents from './EventsAnalyticsTopEvents';
import EventsAnalyticsTotalCard from './EventsAnalyticsTotalCard';

const EventsAnalytics: React.FC = () => {
  const { loading } = useQuery<IEvent[]>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  if (loading) return null;

  return (
    <>
      <Row spacing="sm">
        <EventsAnalyticsTotalCard />
        <EventsAnalyticsAttendanceCard />
      </Row>

      <EventsAnalyticsTopEvents />
      <EventsAnalyticsFrequentAttendees />
    </>
  );
};

export default EventsAnalytics;
