import React, { useEffect } from 'react';

import HeaderTag from '@components/Elements/HeaderTag';
import Loading from '@store/Loading.store';
import BarChart from './Bar';
import Chart, { ChartModel } from './Chart.store';
import FormatChartData from './FormatData';
import FormatLongChartData from './FormatLongData';
import PieChart from './Pie';

const ChartTitle = () => {
  const numResponses = Chart.useStoreState((store) => store.numResponses);
  const title = Chart.useStoreState((store) => store.question?.title);

  return (
    <div>
      <h4>{title}</h4>
      {!!numResponses && <HeaderTag value={`${numResponses} Responses`} />}
    </div>
  );
};

const ChartContent = ({
  question,
  type
}: Pick<ChartModel, 'question' | 'type'>) => {
  const questionType = Chart.useStoreState((store) => store.question?.type);
  const chartType = Chart.useStoreState((store) => store.type);
  const setQuestion = Chart.useStoreActions((store) => store.setQuestion);
  const setType = Chart.useStoreActions((store) => store.setType);

  useEffect(() => {
    if (question?.id) setQuestion(question);
  }, [question]);

  useEffect(() => {
    if (questionType === 'LONG_TEXT' && chartType !== 'bar') setType('bar');
    else if (type === 'line' && chartType !== 'line') setType('line');
  }, [questionType, type]);

  if (!question?.id) return null;

  return (
    <div className="s-analytics-chart s-analytics-card">
      <ChartTitle />
      {questionType === 'LONG_TEXT' && <FormatLongChartData />}
      {questionType !== 'LONG_TEXT' && <FormatChartData />}
      {chartType === 'bar' && <BarChart />}
      {chartType === 'pie' && <PieChart />}
    </div>
  );
};

export default (model: Pick<ChartModel, 'question' | 'type'>) => {
  const loading = Loading.useStoreState((store) => store.loading);
  if (loading) return null;

  return (
    <Chart.Provider>
      <ChartContent {...model} />
    </Chart.Provider>
  );
};
