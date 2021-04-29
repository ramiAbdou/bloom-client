import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Chart from '@components/organisms/Chart/Chart';
import { ChartData, ChartType } from '@components/organisms/Chart/Chart.types';

interface GetMembersSeriesResult {
  getMembersSeries: { name: string; value: number }[];
}

const GET_MEMBERS_SERIES: DocumentNode = gql`
  query GetMembersSeries {
    getMembersSeries {
      name
      value
    }
  }
`;

const MembersAnalyticsTotalChart: React.FC = () => {
  const { data, loading } = useQuery<GetMembersSeriesResult>(
    GET_MEMBERS_SERIES
  );

  const chartData: ChartData[] = data?.getMembersSeries;

  if (loading) return null;

  return (
    <Chart
      className="f-1 w-100--mt"
      data={chartData}
      title="Total Members"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsTotalChart;
