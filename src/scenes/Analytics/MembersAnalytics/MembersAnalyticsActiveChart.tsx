import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Chart from '@components/organisms/Chart/Chart';
import { ChartData, ChartType } from '@components/organisms/Chart/Chart.types';

interface GetActiveMembersSeriesResult {
  getActiveMembersSeries: { name: string; value: number }[];
}

const GET_ACTIVE_MEMBERS_SERIES: DocumentNode = gql`
  query GetActiveMembersSeries {
    getActiveMembersSeries {
      name
      value
    }
  }
`;

const MembersAnalyticsActiveChart: React.FC = () => {
  const { data, loading } = useQuery<GetActiveMembersSeriesResult>(
    GET_ACTIVE_MEMBERS_SERIES
  );

  const chartData: ChartData[] = data?.getActiveMembersSeries;

  if (loading || !chartData?.length) return null;

  return (
    <Chart
      className="f-1 w-100--mt"
      data={chartData}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsActiveChart;
