import React from 'react';
import { LegendPayload } from 'recharts';

type ChartLegendProps = { payload?: LegendPayload[] };

const LegendItem = ({ value, color }: LegendPayload) => (
  <div className="c-chart-legend-item">
    <div style={{ backgroundColor: color }} />
    <p>{value}</p>
  </div>
);

export default ({ payload }: ChartLegendProps) => (
  <>
    {payload.map((item: LegendPayload) => (
      <LegendItem key={item.value} {...item} />
    ))}
  </>
);
