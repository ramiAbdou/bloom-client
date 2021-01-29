import React from 'react';

import { PopulateArgs } from '@constants';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENTS_WITH_GUESTS } from '../../Events/Events.gql';
import EventsAnalyticsAttendanceCard from './EventsAnalyticsAttendanceCard';
import EventsAnalyticsFrequentAttendees from './EventsAnalyticsFrequentAttendees';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';
import EventsAnalyticsTotalCard from './EventsAnalyticsTotalCard';

const EventsAnalytics: React.FC = () => {
  const { loading } = useQuery<IEvent[], PopulateArgs>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS_WITH_GUESTS,
    schema: [Schema.EVENT],
    variables: { populate: ['guests'] }
  });

  if (loading) return null;

  return (
    <div className="s-analytics-page">
      <Row spacing="sm">
        <EventsAnalyticsTotalCard />
        <EventsAnalyticsAttendanceCard />
      </Row>

      <EventsAnalyticsRecentEvents />
      <EventsAnalyticsFrequentAttendees />
    </div>
  );
};

export default EventsAnalytics;
