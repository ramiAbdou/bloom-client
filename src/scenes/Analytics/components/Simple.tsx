import React from 'react';

import { ValueProps } from '@constants';
import { makeClass } from '@util/util';

interface AnalyticsSimpleProps extends ValueProps {
  label: string;
  percentage: string;
}

const NumberContainer = ({
  percentage,
  value
}: Partial<AnalyticsSimpleProps>) => {
  const percentageCss = makeClass([
    's-analytics-simple-percentage',
    [percentage[0] === '+', 's-analytics-simple-percentage--green'],
    [percentage[0] === '-', 's-analytics-simple-percentage--red']
  ]);

  return (
    <div>
      <h1>{value}</h1>
      <p className={percentageCss}>{percentage}</p>
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
