import React from 'react';
import { LegendPayload } from 'recharts';

type ChartLegendItemProps = { color: string; value: string };
type ChartLegendProps = { payload?: LegendPayload[] };

const LegendItem = ({ value, color }: LegendPayload) => (
  <div>
    <div style={{ backgroundColor: color }} />
    <p>{value}</p>
  </div>
);

export default ({ payload }: ChartLegendProps) => (
  <div className="s-analytics-chart-legend">
    {payload.map((item: LegendPayload) => (
      <LegendItem key={item.value} {...item} />
    ))}
  </div>
);
