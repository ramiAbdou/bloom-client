import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';
import ChartStore from './Chart.store';
import { ChartTooltipProps } from './Tooltip';

const LineChartTooltip = ({ label }: Pick<ChartTooltipProps, 'label'>) => {
  const data = ChartStore.useStoreState((store) => store.data);
  const format = ChartStore.useStoreState(({ options }) => options?.format);

  if (!label) return null;

  let value = data.find(({ name }) => name === label)?.value;
  value = format === 'MONEY' ? `$${(value as number) / 100}` : value;
  label = day(label).format('dddd, MMMM D, YYYY');

  return (
    <div className="c-chart-tooltip">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

const LineChartDot = ({ payload, ...props }) => {
  if (!payload || day(payload.name).get('date') !== 1) return null;
  return <Dot r={8} {...props} />;
};

export default () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = ChartStore.useStoreState((store) => store.data, deepequal);
  const interval = ChartStore.useStoreState((store) => store.interval);
  const format = ChartStore.useStoreState(({ options }) => options?.format);
  const isMonitor = useBreakpoint() === 4;

  if (!data?.length) return null;

  return (
    <ResponsiveContainer height={isMonitor ? 360 : 240}>
      <LineChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <CartesianGrid vertical={false} />

        <XAxis
          allowDuplicatedCategory={false}
          dataKey="name"
          interval={interval ?? data.length / 12}
          padding={{ left: 4, right: 12 }}
          tickFormatter={(label) => day(label).format('MMM D')}
          tickSize={8}
        />

        <YAxis
          domain={[(dataMin: number) => Math.round(dataMin * 0.8), 'auto']}
          tickFormatter={(value) => {
            return format === 'MONEY' ? `$${value / 100}` : value;
          }}
          width={48}
        />

        <Tooltip content={({ label }) => <LineChartTooltip label={label} />} />

        <Line
          activeDot={{ r: 8 }}
          dataKey="value"
          dot={(props) => <LineChartDot {...props} />}
          stroke={color}
          type="monotone"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
