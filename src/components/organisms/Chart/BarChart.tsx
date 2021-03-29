import React from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { useStoreState } from '@store/Store';
import Chart from './Chart.store';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const BarChart: React.FC = () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = Chart.useStoreState((state) => state.data);
  const xAxisOptions = useXAxisOptions();
  const yAxisOptions = useYAxisOptions();

  if (!data?.length) return null;

  // Allows the chart to be large/not squish and is scrollable.
  const minWidth = data.length * 24;

  return (
    <ResponsiveContainer height={360} minWidth={minWidth}>
      <RechartsBarChart
        barSize={24}
        data={data}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis {...xAxisOptions} interval="preserveStart" />
        <YAxis {...yAxisOptions} />

        <Tooltip
          content={(props: ChartTooltipProps) => <ChartTooltip {...props} />}
          wrapperStyle={{ visibility: 'visible' }}
        />
        <Bar dataKey="value" fill={color} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
