import day from 'dayjs';
import React from 'react';

import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.store';

const DuesAnalyticsChart: React.FC = () => {
  const data = Array.from(Array(30).keys()).map((i: number) => ({
    name: day().subtract(i, 'd').format(),
    value: i * 100
  }));

  return (
    <Chart
      data={data}
      interval={2}
      title="Total Dues Collected"
      type={ChartType.TIME_SERIES}
    />
  );
};

export default DuesAnalyticsChart;
