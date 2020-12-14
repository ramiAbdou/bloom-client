import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { useStoreState } from '@store/Store';
import Chart from '../Chart.store';
import ChartTooltip, { ChartTooltipProps } from '../components/Tooltip';

export default () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = Chart.useStoreState((store) => store.data);

  if (!data?.length) return null;

  // Allows the chart to be large/not squish and is scrollable.
  const minWidth = data.length * 24;

  return (
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
  );
};
