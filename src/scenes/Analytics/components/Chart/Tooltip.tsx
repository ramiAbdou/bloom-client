import React from 'react';

import Chart from './Chart.store';

export type ChartTooltipProps = { active?: boolean; label?: string };

export default ({ active, label }: ChartTooltipProps) => {
  const data = Chart.useStoreState((store) => store.data);
  const numResponses = Chart.useStoreState((store) => store.numResponses);

  if (!active || !label) return null;

  const { value } = data.find(({ name }) => name === label);
  const percentageOfTotal = ((value / numResponses) * 100).toFixed(2);

  return (
    <div className="s-analytics-chart-tooltip">
      <p>{label}</p>
      <p>
        {value} ({percentageOfTotal}%)
      </p>
    </div>
  );
};
