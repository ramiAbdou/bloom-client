import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import Chart from '../Chart.store';
import ChartLegend from '../components/Legend';
import ChartTooltip, { ChartTooltipProps } from '../components/Tooltip';

const COLORS = [
  '#1F78B4',
  '#00C49F',
  '#B2DF8A',
  '#FFBB28',
  '#FF8042',
  '#FB9A99',
  '#E31A1C'
];

export default () => {
  const data = Chart.useStoreState((store) => store.data);

  if (!data?.length) return null;

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
