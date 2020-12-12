import React, { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import HeaderTag from '@components/Elements/HeaderTag';
import Loading from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import Chart, { ChartModel } from './Chart.store';

const ChartTitle = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const numResponses = Chart.useStoreState((store) => store.numResponses);
  const title = Chart.useStoreState((store) => store.question?.title);

  return (
    <div>
      <h4>{title}</h4>
      {!loading && <HeaderTag value={`${numResponses} Responses`} />}
    </div>
  );
};

const ChartGraphic = () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = Chart.useStoreState((store) => store.data);

  return (
    <div className="s-analytics-chart-graphic">
      <ResponsiveContainer height={360}>
        <BarChart
          barSize={16}
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartContent = (
  model: Pick<ChartModel, 'data' | 'question' | 'numResponses'>
) => {
  const init = Chart.useStoreActions((store) => store.init);

  useEffect(() => {
    const { data, question, numResponses } = model ?? {};
    if (question?.id && data) init({ data, numResponses, question });
  }, [model]);

  return (
    <div className="s-analytics-chart">
      <ChartTitle />
      <ChartGraphic />
    </div>
  );
};

export default (
  model: Pick<ChartModel, 'data' | 'question' | 'numResponses'>
) => (
  <Chart.Provider>
    <ChartContent {...model} />
  </Chart.Provider>
);
