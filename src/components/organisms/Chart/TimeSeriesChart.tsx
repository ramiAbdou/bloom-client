import day from 'dayjs';
import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';
import { take } from '@util/util';
import ChartStore from './Chart.store';
import { ChartTooltipProps } from './Tooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const LineChartTooltip: React.FC<Pick<ChartTooltipProps, 'label'>> = ({
  label
}) => {
  const data = ChartStore.useStoreState((state) => state.data);
  const format = ChartStore.useStoreState(({ options }) => options?.format);

  if (!label) return null;

  const value = data.find(({ name }) => name === label)?.value;

  const formattedLabel: string = take([
    [format === 'HOUR', day(label).format('dddd, MMMM D @ h:mm A')],
    [true, day(label).format('dddd, MMMM D, YYYY')]
  ]);

  const formattedValue: string = take([
    [format === 'MONEY', `$${value as number}`],
    [true, value]
  ]);

  return (
    <div className="o-chart-tooltip">
      <p>{formattedLabel}</p>
      <p>{formattedValue}</p>
    </div>
  );
};

const TimeSeriesChart: React.FC = () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = ChartStore.useStoreState((state) => state.data, deepequal);
  const isMonitor = useBreakpoint() === 4;
  const xAxisOptions = useXAxisOptions();
  const yAxisOptions = useYAxisOptions();

  if (!data?.length) return null;

  return (
    <ResponsiveContainer height={isMonitor ? 360 : 240}>
      <LineChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis {...xAxisOptions} />
        <YAxis {...yAxisOptions} />
        <Tooltip content={({ label }) => <LineChartTooltip label={label} />} />
        <Line
          activeDot={{ r: 8 }}
          dataKey="value"
          dot={false}
          stroke={color}
          type="basis"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
