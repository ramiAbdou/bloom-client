import React from 'react';
import { TooltipPayload } from 'recharts';

import { getChartTotalCount, useChartState } from './Chart.state';
import { ChartState } from './Chart.types';

export type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
};

// The tooltip data that we need will either come from the label if it is a bar
// chart, or from the payload if it is a pie chart. Subject to change.
const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  label,
  payload
}) => {
  const { data }: ChartState = useChartState();

  // Only show the tooltip if it active.
  if (!active || (!label && !payload?.length)) return null;

  label = label ?? payload[0]?.name;

  const { value } = data.find(({ name }) => name === label);

  const totalCount: number = getChartTotalCount({ data });

  const percentageOfTotal: string = (
    ((value as number) / totalCount) *
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

export default ChartTooltip;
