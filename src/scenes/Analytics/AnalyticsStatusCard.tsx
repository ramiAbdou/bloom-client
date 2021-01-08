import React from 'react';

import Pill from '@atoms/Tags/Pill';
import { ValueProps } from '@constants';

interface AnalyticsSimpleProps extends ValueProps {
  label: string;
  percentage: number;
}

const NumberContainer: React.FC<
  Pick<AnalyticsSimpleProps, 'percentage' | 'value'>
> = ({ percentage, value }) => (
  <div>
    <p>{value}</p>
    <Pill percentage={percentage} />
  </div>
);

/**
 * Displays a simple number and our statistic, including the percentage of
 * either growth or lack thereof.
 */
export default ({ label, ...props }: AnalyticsSimpleProps) => (
  <div className="s-analytics-simple">
    <NumberContainer {...props} />
    <h4>{label}</h4>
  </div>
);
