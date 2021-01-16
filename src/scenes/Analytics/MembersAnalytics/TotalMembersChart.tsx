import React from 'react';

import { TimeSeriesResult } from '@constants';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_TOTAL_MEMBERS_SERIES } from '../Analytics.gql';

const TotalMembersChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesResult[]>({
    name: 'getTotalMembersSeries',
    query: GET_TOTAL_MEMBERS_SERIES
  });

  if (loading) return null;

  return (
    <Chart data={data} title="Total Members" type={ChartType.TIME_SERIES} />
  );
};

export default TotalMembersChart;
