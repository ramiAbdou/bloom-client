import React from 'react';

import Chart from '@components/Chart/Chart';
import { ChartType } from '@components/Chart/Chart.store';
import Members from '../Members.store';

export default () => {
  const totalChartData = Members.useStoreState((store) => store.totalChartData);
  if (!totalChartData?.length) return null;

  return (
    <Chart
      data={totalChartData}
      title="Total Members"
      type={ChartType.TIME_SERIES}
    />
  );
};
