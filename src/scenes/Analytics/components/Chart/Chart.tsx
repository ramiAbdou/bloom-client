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
import FormatChartData from './FormatData';
import FormatLongChartData from './FormatLongData';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';

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

  if (!data.length) return null;

  // Allows the chart to be large/not squish and is scrollable.
  const minWidth = data.length * 24;

  return (
    <div className="s-analytics-chart-graphic">
      <ResponsiveContainer height={360} minWidth={minWidth}>
        <BarChart
          barSize={24}
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey="name"
            minTickGap={16}
            tickSize={8}
          />
          <YAxis />

          <Tooltip
            content={(props: ChartTooltipProps) => <ChartTooltip {...props} />}
            wrapperStyle={{ visibility: 'visible' }}
          />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartContent = ({ question }: Pick<ChartModel, 'question'>) => {
  const type = Chart.useStoreState((store) => store.question?.type);
  const setQuestion = Chart.useStoreActions((store) => store.setQuestion);

  useEffect(() => {
    if (question?.id) setQuestion(question);
  }, [question]);

  if (!question?.id) return null;

  return (
    <div className="s-analytics-chart s-analytics-card">
      <ChartTitle />
      {type === 'LONG_TEXT' && <FormatLongChartData />}
      {type !== 'LONG_TEXT' && <FormatChartData />}
      <ChartGraphic />
    </div>
  );
};

export default (model: Pick<ChartModel, 'question'>) => (
  <Chart.Provider>
    <ChartContent {...model} />
  </Chart.Provider>
);
