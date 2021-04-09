import React from 'react';

import useCustomQuery from '@gql/useCustomQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
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
