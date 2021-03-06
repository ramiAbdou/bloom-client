import React from 'react';

import Section from '@containers/Section';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { TimeSeriesData } from '@util/constants';
import { QueryEvent } from '@util/constants.events';

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: QueryEvent.GET_EVENT_ATTENDEES_SERIES
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
