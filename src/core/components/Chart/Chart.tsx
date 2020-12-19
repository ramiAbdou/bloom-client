import React, { useEffect } from 'react';

import Chart, { ChartModelInitArgs, ChartType } from './Chart.store';
import ChartHeader from './components/Header';
import FormatQuestionData from './FormatQuestionData';
import BarChart from './variants/Bar';
import PieChart from './variants/Pie';
import TimeSeriesChart from './variants/TimeSeries';

const ChartContent = ({ questionId, ...data }: ChartModelInitArgs) => {
  const chartType = Chart.useStoreState((store) => store.type);
  const setData = Chart.useStoreActions((store) => store.setData);

  useEffect(() => {
    // Only time we'll need to update the data is if the title/type are set.
    if (!data) return;
    setData(data);
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
