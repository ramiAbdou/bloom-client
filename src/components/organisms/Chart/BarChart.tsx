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

import useCommunityPrimaryColor from '@core/hooks/useCommunityPrimaryColor';
import { useChart } from './Chart.state';
import ChartTooltip, { ChartTooltipProps } from './ChartTooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const BarChart: React.FC = () => {
  const [{ data }] = useChart();
  const primaryColor: string = useCommunityPrimaryColor();
  const xAxisOptions = useXAxisOptions();
  const yAxisOptions = useYAxisOptions();

  if (!data?.length) return null;

  // Allows the chart to be large/not squish and is scrollable.
  const minWidth: number = data.length * 24;

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
        <Bar dataKey="value" fill={primaryColor} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
