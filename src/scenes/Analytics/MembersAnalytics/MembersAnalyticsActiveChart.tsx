import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_ACTIVE_MEMBERS_SERIES } from '../Analytics.gql';

const MembersAnalyticsActiveChart: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getActiveMembersSeries',
    query: GET_ACTIVE_MEMBERS_SERIES
  });

  return (
    <Chart
      data={data}
      show={!loading}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsActiveChart;
