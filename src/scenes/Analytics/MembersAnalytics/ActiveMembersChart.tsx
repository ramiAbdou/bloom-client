import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.store';
import { GET_ACTIVE_GROWTH_SERIES } from '../Analytics.gql';

export default () => {
  const { data, loading } = useQuery({
    name: 'getActiveGrowthSeries',
    query: GET_ACTIVE_GROWTH_SERIES
  });

  if (loading) return null;

  return (
    <Chart
      data={data}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};
