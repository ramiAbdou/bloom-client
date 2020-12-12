import React, { useEffect } from 'react';
import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import Chart, { ChartModel } from './Chart.store';

const ChartTitle = () => {
  const title = Chart.useStoreState((store) => store.question?.title);
  return <h4>{title}</h4>;
};

const ChartGraphic = () => {
  const data = Chart.useStoreState((store) => store.data);

  return (
    <BarChart data={data} height={250} width={730}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Bar fill="#8884d8" />
      <Bar fill="#82ca9d" /> */}
    </BarChart>
  );
};

const ChartContent = (model: Pick<ChartModel, 'data' | 'question'>) => {
  const setData = Chart.useStoreActions((store) => store.setData);
  const setQuestion = Chart.useStoreActions((store) => store.setQuestion);

  useEffect(() => {
    const { question } = model ?? {};
    if (question?.id) setQuestion(question);
  }, [model?.question?.id]);

  useEffect(() => {
    const { data } = model ?? {};
    if (data) setData(data);
  }, [model?.data]);

  return (
    <div className="s-analytics-chart">
      <ChartTitle />
      <ChartGraphic />
    </div>
  );
};

export default (model: Pick<ChartModel, 'data' | 'question'>) => (
  <Chart.Provider>
    <ChartContent {...model} />
  </Chart.Provider>
);
