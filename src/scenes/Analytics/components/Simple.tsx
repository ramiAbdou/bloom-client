import React from 'react';

import { ValueProps } from '@constants';

interface AnalyticsSimpleProps extends ValueProps {
  label: string;
  percentage: string;
}

const NumberContainer = ({
  percentage,
  value
}: Partial<AnalyticsSimpleProps>) => {
  return (
    <div>
      <h1>{value}</h1>
      <p>{percentage}</p>
    </div>
  );
};

/**
 * Displays a simple number and our statistic, including the percentage of
 * either growth or lack thereof.
 */
export default ({ label, ...props }: AnalyticsSimpleProps) => {
  return (
    <div className="s-analytics-simple">
      <NumberContainer {...props} />
      <p>{label}</p>
    </div>
  );
};
