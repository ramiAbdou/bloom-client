import React from 'react';

import Pill from '@atoms/Tags/Pill';
import { ShowProps, ValueProps } from '@constants';

interface AnalyticsSimpleProps extends ShowProps, ValueProps {
  label: string;
  percentage?: number;
}

const AnalyticsCardNumberContainer: React.FC<
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
const AnalyticsCard: React.FC<AnalyticsSimpleProps> = ({
  label,
  show,
  ...props
}) => {
  if (show === false) return null;

  return (
    <div className="t-card--analytics">
      <AnalyticsCardNumberContainer {...props} />
      <h4>{label}</h4>
    </div>
  );
};

export default AnalyticsCard;
