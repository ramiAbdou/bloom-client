import React from 'react';

import { TimeSeriesData } from '@constants';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: 'getEventAttendeesSeries'
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
