import React from 'react';
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
  let data = Chart.useStoreState((store) => store.data);

  if (!data.length) return null;

  // As long as there's no other group name called 'Other', then we should
  // reduce the data to 5 groups and add up the remaining totals together into
  // one 'Other' group.
  if (data.length > 5 && !data.some(({ name }) => name === 'Other')) {
    data = [
      ...data.slice(0, 4),
      {
        name: 'Other',
        value: data
          .slice(4)
          .reduce((acc: number, { value }: ChartData) => acc + value, 0)
      }
    ];
  }

  return (
    <div className="s-analytics-chart-pie">
      <ResponsiveContainer height={360}>
        <PieChart margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
          <Legend
            content={(props: any) => <ChartLegend {...props} />}
            verticalAlign="middle"
            wrapperStyle={{ position: 'initial', width: 'max-content' }}
          />

          <Pie label animationBegin={0} data={data} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            content={(props: ChartTooltipProps) => <ChartTooltip {...props} />}
            wrapperStyle={{ visibility: 'visible', width: 'fit-content' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
