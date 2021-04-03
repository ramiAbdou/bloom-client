import React from 'react';

import useBloomQuery from '@gql/useBloomQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { TimeSeriesData } from '@util/constants';
import { QueryEvent } from '@util/constants.events';

const MembersAnalyticsTotalChart: React.FC = () => {
  const { data, loading } = useBloomQuery<TimeSeriesData[]>({
    fields: ['name', 'value'],
    operation: QueryEvent.GET_MEMBERS_SERIES
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
