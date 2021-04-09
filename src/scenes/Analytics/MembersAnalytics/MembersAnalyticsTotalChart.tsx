import React from 'react';

import useCustomQuery from '@gql/useCustomQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { TimeSeriesData } from '@util/constants';

const MembersAnalyticsTotalChart: React.FC = () => {
  const { data, loading } = useCustomQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    queryName: 'getMembersSeries'
  });

  return (
    <Chart
      className="f-1 w-100--mt"
      data={data}
      show={!loading}
      title="Total Members"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default MembersAnalyticsTotalChart;
