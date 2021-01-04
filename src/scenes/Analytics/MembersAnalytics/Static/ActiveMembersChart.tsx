import React from 'react';

import Chart from '@components/Chart/Chart';
import { ChartType } from '@components/Chart/Chart.store';
import Members from '../MembersAnalytics.store';

export default () => {
  const activeChartData = Members.useStoreState(
    (store) => store.activeChartData
  );

  if (!activeChartData?.length) return null;

  return (
    <Chart
      data={activeChartData}
      title="Active Users in Last 30 Days"
      type={ChartType.TIME_SERIES}
    />
  );
};
