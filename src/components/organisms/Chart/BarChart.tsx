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

import { ICommunity } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import Chart from './Chart.store';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';
import useXAxisOptions from './useXAxisOptions';
import useYAxisOptions from './useYAxisOptions';

const BarChart: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: community, loading } = useFindOneFull(ICommunity, {
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
