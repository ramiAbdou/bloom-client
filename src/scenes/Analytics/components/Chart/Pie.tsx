import React, { useEffect } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import Chart, { ChartData } from './Chart.store';
import ChartLegend from './Legend';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';

const COLORS = ['#1F78B4', '#00C49F', '#FFBB28', '#FF8042', '#FB9A99'];

export default () => {
  const data = Chart.useStoreState((store) => store.data);
  const numResponses = Chart.useStoreState((store) => store.numResponses);
  const initData = Chart.useStoreActions((store) => store.initData);

  // As long as there's no other group name called 'Other', then we should
  // reduce the data to 5 groups and add up the remaining totals together into
  // one 'Other' group.
  useEffect(() => {
    if (
      !data ||
      data.length <= 5 ||
      data.some(({ name }) => name === 'Other')
    ) {
      return;
    }

    // We re-initialize that data so that count values are displayed correctly
    // with the "other" group.
    initData({
      data: [
        ...data.slice(0, 4),
        {
          name: 'Other',
          value: data
            .slice(4)
            .reduce((acc: number, { value }: ChartData) => acc + value, 0)
        }
      ],
      numResponses
    });
  }, [data]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer height={360}>
      <PieChart margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <Legend
          align="left"
          content={(props: any) => <ChartLegend {...props} />}
          layout="vertical"
          verticalAlign="middle"
        />

        <Pie label animationBegin={0} cx={240} data={data} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip
          content={(props: ChartTooltipProps) => <ChartTooltip {...props} />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
