import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { GET_ACTIVE_MEMBERS_SERIES } from '../Analytics.gql';

const ActiveMembersChart: React.FC = () => {
  const { data, loading } = useQuery({
    name: 'getActiveMembersSeries',
    query: GET_ACTIVE_MEMBERS_SERIES
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

export default ActiveMembersChart;
