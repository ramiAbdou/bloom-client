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
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useFindOne from '@gql/hooks/useFindOne';
import { ICommunity } from '@util/constants.entities';
import Chart from './Chart.store';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const BarChart: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['primaryColor'],
    where: { id: communityId }
  });

  const data = Chart.useStoreState((state) => state.data);

  const xAxisOptions = useXAxisOptions();
  const yAxisOptions = useYAxisOptions();

  if (loading || !data?.length) return null;

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
        <Bar dataKey="value" fill={community.primaryColor} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
