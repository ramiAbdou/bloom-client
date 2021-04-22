import React from 'react';

import Chart from '@components/organisms/Chart/Chart';
import { ChartType } from '@components/organisms/Chart/Chart.types';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import { TimeSeriesData } from '@util/constants';

const MembersAnalyticsActiveChart: React.FC = () => {
  const { data, loading } = useCustomQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    queryName: 'getActiveMembersSeries'
  });

  return (
    <Chart
      className="f-1 w-100--mt"
      data={data}
      show={!loading}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsActiveChart;
