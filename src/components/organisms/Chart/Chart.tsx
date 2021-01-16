import React, { useEffect } from 'react';

import BarChart from './Bar';
import Chart, { ChartModelInitArgs, ChartType } from './Chart.store';
import FormatQuestionData from './FormatQuestionData';
import ChartHeader from './Header';
import PieChart from './Pie';
import TimeSeriesChart from './TimeSeries';

const ChartContent = ({ questionId, ...data }: ChartModelInitArgs) => {
  const chartType = Chart.useStoreState((store) => store.type);
  const setData = Chart.useStoreActions((store) => store.setData);

  useEffect(() => {
    // Only time we'll need to update the data is if the title/type are set.
    if (data) setData(data);
  }, [data]);

  return (
    <>
      {questionId && <FormatQuestionData questionId={questionId} />}
      {chartType === ChartType.BAR && <BarChart />}
      {chartType === ChartType.PIE && <PieChart />}
      {chartType === ChartType.TIME_SERIES && <TimeSeriesChart />}
    </>
  );
};

export default (args: ChartModelInitArgs) => (
  <Chart.Provider>
    <div className="c-chart">
      <ChartHeader />
      <ChartContent {...args} />
    </div>
  </Chart.Provider>
);
