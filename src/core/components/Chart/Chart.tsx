import React, { useEffect } from 'react';

import Chart, { ChartModelInitArgs, ChartType } from './Chart.store';
import ChartHeader from './components/Header';
import FormatQuestionData from './FormatQuestionData';
import BarChart from './variations/Bar';
import PieChart from './variations/Pie';
import TimeSeriesChart from './variations/TimeSeries';

const ChartContent = ({
  data,
  questionId,
  totalResponses,
  type,
  title
}: ChartModelInitArgs) => {
  const chartType = Chart.useStoreState((store) => store.type);
  const setData = Chart.useStoreActions((store) => store.setData);

  useEffect(() => {
    setData({ data, title, totalResponses, type });
  }, [data, title, type]);

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
