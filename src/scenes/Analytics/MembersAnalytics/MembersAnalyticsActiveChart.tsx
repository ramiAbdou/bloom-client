import React from 'react';

import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { TimeSeriesData } from '@util/constants';

const MembersAnalyticsActiveChart: React.FC = () => {
  const { data, loading } = useQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: 'getActiveMembersSeries'
  });

  return (
    <Chart
      className="f-1 w-100--t"
      data={data}
      show={!loading}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsActiveChart;
