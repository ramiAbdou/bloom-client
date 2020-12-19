import day from 'dayjs';
import React from 'react';

import Chart from '@components/Chart/Chart';
import { ChartType } from '@components/Chart/Chart.store';

export default () => {
  const data = Array.from(Array(30).keys())
    .map((i: number) => ({
      name: day().subtract(i, 'd').format(),
      value: i * 100
    }))
    .reverse();

  return (
    <Chart
      data={data}
      interval={2}
      title="Total Dues Collected"
      type={ChartType.TIME_SERIES}
    />
  );
};
