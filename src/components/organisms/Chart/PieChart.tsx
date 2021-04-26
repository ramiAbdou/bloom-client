import React from 'react';
import {
  Cell,
  Legend,
  LegendPayload,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import Row from '@components/containers/Row/Row';
import { useChartState } from './Chart.state';
import { ChartState } from './Chart.types';
import ChartTooltip, { ChartTooltipProps } from './Tooltip';

// Pie chart colors for all of the different options.

const COLORS: string[] = [
  '#40a8c4',
  '#00C49F',
  '#B2DF8A',
  '#FFBB28',
  '#FB9A99',
  '#FF8042',
  '#E31A1C'
];

interface PieChartLegendProps {
  payload?: LegendPayload[];
}

const PieChartLegend: React.FC<PieChartLegendProps> = ({ payload }) => (
  <>
    {payload.map(({ color, value }: LegendPayload) => (
      <Row key={value} className="mb-xs--nlc">
        <div className="br-xxs h-md w-md" style={{ backgroundColor: color }} />
        <p className="meta ml-xs">{value}</p>
      </Row>
    ))}
  </>
);

const PieChart: React.FC = () => {
  const { data }: ChartState = useChartState();

  if (!data?.length) return null;

  return (
    <ResponsiveContainer height={360}>
      <RechartsPieChart margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <Legend
          align="left"
          content={(props: any) => <PieChartLegend {...props} />}
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
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
