import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { Schema } from '@store/Db/schema';
import { GET_EVENT_ATTENDEES_SERIES } from '../Analytics.gql';

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getEventAttendeesSeries',
    query: GET_EVENT_ATTENDEES_SERIES,
    schema: [Schema.EVENT_WATCH]
  });

  return (
    <Chart
      data={data}
      show={!loading}
      title="Event Attendees in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default EventAnalyticsChart;
