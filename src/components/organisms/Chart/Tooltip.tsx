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
export default ({ active, label, payload }: ChartTooltipProps): JSX.Element => {
  const data = Chart.useStoreState((state) => {
    return state.data;
  });

  const totalResponses = Chart.useStoreState((state) => {
    return state.totalResponses;
  });

  // Only show the tooltip if it active.
  if (!active || (!label && !payload?.length)) return null;

  label = label ?? payload[0]?.name;

  const { value } = data.find(({ name }) => {
    return name === label;
  });

  const percentageOfTotal = (
    ((value as number) / totalResponses) *
    100
  ).toFixed(2);

  return (
    <div className="o-chart-tooltip">
      <p>{label}</p>
      <p>
        {value} ({percentageOfTotal}%)
      </p>
    </div>
  );
};
