import React from 'react';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface AnalyticsSimpleProps extends ValueProps {
  label: string;
  percentage: number;
}

const NumberContainer = ({
  percentage,
  value
}: Partial<AnalyticsSimpleProps>) => {
  const isPositive = percentage >= 0;

  const percentageCss = makeClass([
    's-analytics-simple-percentage',
    [isPositive, 's-analytics-simple-percentage--green'],
    [!isPositive, 's-analytics-simple-percentage--red']
  ]);

  let percentageString = `${percentage}%`;
  if (isPositive) percentageString = `+${percentageString}`;

  return (
    <div>
      <h1>{value}</h1>
      <p className={percentageCss}>{percentageString}</p>
    </div>
  );
};

/**
 * Displays a simple number and our statistic, including the percentage of
 * either growth or lack thereof.
 */
export default ({ label, ...props }: AnalyticsSimpleProps) => (
  <div className="s-analytics-simple">
    <NumberContainer {...props} />
    <p>{label}</p>
  </div>
);
