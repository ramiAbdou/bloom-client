import React from 'react';

import { TimeSeriesData } from '@constants';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.store';
import { GET_TOTAL_GROWTH_SERIES } from '../Analytics.gql';

const TotalMembersChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    name: 'getTotalGrowthSeries',
    query: GET_TOTAL_GROWTH_SERIES
  });

  if (loading) return null;

  return (
    <Chart data={data} title="Total Members" type={ChartType.TIME_SERIES} />
  );
};

export default TotalMembersChart;
