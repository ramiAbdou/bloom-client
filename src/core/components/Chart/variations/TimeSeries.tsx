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

import useWindowWidth from '@hooks/useWindowWidth';
import { useStoreState } from '@store/Store';
import Chart from '../Chart.store';
import { ChartTooltipProps } from '../components/Tooltip';

const LineChartTooltip = ({ label }: Pick<ChartTooltipProps, 'label'>) => {
  const data = Chart.useStoreState((store) => store.data);

  if (!label) return null;

  const { value } = data.find(({ name }) => name === label);
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
  const data = Chart.useStoreState((store) => store.data, deepequal);
  const windowWidth = useWindowWidth();

  if (!data?.length) return null;

  return (
    <ResponsiveContainer height={windowWidth > 1440 ? 360 : 240}>
      <LineChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <CartesianGrid vertical={false} />

        <XAxis
          tick
          allowDuplicatedCategory={false}
          dataKey="name"
          minTickGap={16}
          tickCount={4}
          tickFormatter={(label) => day(label).format('M/D')}
          tickSize={8}
        />
        <YAxis domain={['auto', 'auto']} width={48} />
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
