import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_TOTAL_DUES_SERIES } from '../Analytics.gql';
import { TimeSeriesResult } from '../Analytics.types';

const DuesAnalyticsChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesResult[]>({
    name: 'getTotalDuesSeries',
    query: GET_TOTAL_DUES_SERIES
  });

  if (loading || data?.every(({ value }) => !value)) return null;

  return (
    <Chart
      data={data}
      interval={2}
      options={{ format: 'MONEY' }}
      title="Total Dues Collected"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default DuesAnalyticsChart;
