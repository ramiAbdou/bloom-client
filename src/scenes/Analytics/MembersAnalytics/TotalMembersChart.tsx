import React from 'react';

import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.store';
import Members from './MembersAnalytics.store';

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
