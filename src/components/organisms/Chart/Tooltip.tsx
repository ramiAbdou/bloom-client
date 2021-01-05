import React from 'react';
import { TooltipPayload } from 'recharts';

import Chart from './Chart.store';

export type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
};

// The tooltip data that we need will either come from the label if it is a bar
// chart, or from the payload if it is a pie chart. Subject to change.
export default ({ active, label, payload }: ChartTooltipProps) => {
  const data = Chart.useStoreState((store) => store.data);
  const totalResponses = Chart.useStoreState((store) => store.totalResponses);

  // Only show the tooltip if it active.
  if (!active || (!label && !payload?.length)) return null;

  label = label ?? payload[0]?.name;
  const { value } = data.find(({ name }) => name === label);
  const percentageOfTotal = ((value / totalResponses) * 100).toFixed(2);

  return (
    <div className="c-chart-tooltip">
      <p>{label}</p>
      <p>
        {value} ({percentageOfTotal}%)
      </p>
    </div>
  );
};
