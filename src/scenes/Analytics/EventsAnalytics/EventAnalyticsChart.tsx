import React from 'react';

import Section from '@components/containers/Section';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import Chart from '@components/organisms/Chart/Chart';
import { ChartType } from '@components/organisms/Chart/Chart.types';
import { TimeSeriesData } from '@util/constants';

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useCustomQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    queryName: 'getEventAttendeesSeries'
  });

  if (loading) return null;

  return (
    <Section>
      <Chart
        data={data}
        title="Event Attendees in Last 30 Days"
        type={ChartType.TIME_SERIES}
      />
    </Section>
  );
};

export default EventAnalyticsChart;
