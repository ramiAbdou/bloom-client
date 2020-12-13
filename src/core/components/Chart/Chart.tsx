import React, { useEffect } from 'react';

import Chart, { ChartModelInitArgs, ChartType } from './Chart.store';
import FormatQuestionData from './FormatQuestionData';
import ChartHeader from './components/Header';
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
  const currentQuestionId = Chart.useStoreState((store) => store.questionId);
  const setQuestionId = Chart.useStoreActions((store) => store.setQuestionId);
  const setData = Chart.useStoreActions((store) => store.setData);

  useEffect(() => {
    if (questionId !== currentQuestionId) setQuestionId(questionId);
  }, [questionId]);

  useEffect(() => {
    setData({ data, title, totalResponses, type });
  }, [data, title, type]);

  return (
    <>
      {questionId && <FormatQuestionData />}
      {type === ChartType.BAR && <BarChart />}
      {type === ChartType.PIE && <PieChart />}
      {type === ChartType.TIME_SERIES && <TimeSeriesChart />}
    </>
  );
};

export default (args: ChartModelInitArgs) => (
  <Chart.Provider>
    <ChartHeader />
    <ChartContent {...args} />
  </Chart.Provider>
);
