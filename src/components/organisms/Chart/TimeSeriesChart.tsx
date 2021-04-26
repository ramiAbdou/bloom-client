import day from 'dayjs';
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

import useCommunityPrimaryColor from '@core/hooks/useCommunityPrimaryColor';
import useBreakpoint from '@hooks/useBreakpoint';
import { take } from '@util/util';
import { useChartState } from './Chart.state';
import { ChartState } from './Chart.types';
import { ChartTooltipProps } from './ChartTooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const LineChartTooltip: React.FC<Pick<ChartTooltipProps, 'label'>> = ({
  label
}) => {
  const { data, options }: ChartState = useChartState();

  if (!label) return null;

  const value = data.find(({ name }) => name === label)?.value;

  const formattedLabel: string = take([
    [options?.format === 'HOUR', day(label).format('dddd, MMMM D @ h:mm A')],
    [true, day(label).format('dddd, MMMM D, YYYY')]
  ]);

  const formattedValue: string = take([
    [options?.format === 'MONEY', `$${value as number}`],
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
  const { data }: ChartState = useChartState();

  const primaryColor: string = useCommunityPrimaryColor();
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
          stroke={primaryColor}
          type="basis"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
