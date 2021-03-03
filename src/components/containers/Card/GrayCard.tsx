import React from 'react';

import Pill from '@atoms/Tag/Pill';
import { BaseProps, ValueProps } from '@util/constants';
import { cx } from '@util/util';

interface GrayCardProps extends BaseProps, ValueProps {
  label: string;
  percentage?: number;
}

const GrayCardNumberContainer: React.FC<
  Pick<GrayCardProps, 'percentage' | 'value'>
> = ({ percentage, value }) => {
  return (
    <div>
      <p>{value}</p>
      <Pill percentage={percentage} />
    </div>
  );
};

/**
 * Displays a simple number and our statistic, including the percentage of
 * either growth or lack thereof.
 */
const GrayCard: React.FC<GrayCardProps> = ({
  className,
  label,
  show,
  ...props
}) => {
  if (show === false) return null;

  const css = cx('t-card--analytics', {}, className);

  return (
    <div className={css}>
      <GrayCardNumberContainer {...props} />
      <h4>{label}</h4>
    </div>
  );
};

export default GrayCard;
