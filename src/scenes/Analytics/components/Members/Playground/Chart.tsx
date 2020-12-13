import React from 'react';

import ChartContent from '../../Chart/Chart';
import Chart from '../../Chart/Chart.store';
import PlaygroundChartContent from './ChartContent';

export default () => (
  <Chart.Provider>
    <ChartContent Content={PlaygroundChartContent} />
  </Chart.Provider>
);
