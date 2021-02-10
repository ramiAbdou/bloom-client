import React from 'react';

import { TimeSeriesData } from '@constants';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_TOTAL_MEMBERS_SERIES } from '../Analytics.gql';

const MembersAnalyticsTotalChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    name: 'getTotalMembersSeries',
    query: GET_TOTAL_MEMBERS_SERIES
  });

  return (
    <Chart
      data={data}
      show={!loading}
      title="Total Members"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsTotalChart;
