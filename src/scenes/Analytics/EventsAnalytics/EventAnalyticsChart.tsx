import React from 'react';

import { TimeSeriesData } from '@constants';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: 'getEventAttendeesSeries'
  });

  if (loading) return null;

  return (
    <MainSection>
      <Chart
        data={data}
        title="Event Attendees in Last 30 Days"
        type={ChartType.TIME_SERIES}
      />
    </MainSection>
  );
};

export default EventAnalyticsChart;
