import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Section from '@components/containers/Section';
import Chart from '@components/organisms/Chart/Chart';
import { ChartData, ChartType } from '@components/organisms/Chart/Chart.types';

interface GetEventAttendeesSeriesResult {
  getEventAttendeesSeries: { name: string; value: number }[];
}

const GET_EVENT_ATTENDEES_SERIES: DocumentNode = gql`
  query GetEventAttendeesSeries {
    getEventAttendeesSeries {
      name
      value
    }
  }
`;

const EventAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<GetEventAttendeesSeriesResult>(
    GET_EVENT_ATTENDEES_SERIES
  );

  const chartData: ChartData[] = data?.getEventAttendeesSeries;

  if (loading || !chartData?.length) return null;

  return (
    <Section>
      <Chart
        data={chartData}
        title="Event Attendees in Last 30 Days"
        type={ChartType.TIME_SERIES}
      />
    </Section>
  );
};

export default EventAnalyticsChart;
