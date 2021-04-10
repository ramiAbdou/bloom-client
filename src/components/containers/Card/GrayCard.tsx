import React from 'react';

import Spinner from '@components/atoms/Spinner/Spinner';
import Pill from '@components/atoms/Tag/Pill';
import Row from '@components/containers/Row/Row';
import { BaseProps, LoadingProps, ValueProps } from '@util/constants';
import { cx } from '@util/util';

interface GrayCardProps extends BaseProps, LoadingProps, ValueProps {
  label: string;
  percentage?: number;
}

const GrayCardNumberContainer: React.FC<
  Pick<GrayCardProps, 'percentage' | 'value'>
> = (props) => {
  const { percentage, value } = props;

  if (value === undefined || value === null) return null;

  return (
    <Row className="mb-xxs--nlc">
      <p className="display mr-xs--nlc">{value}</p>
      <Pill percentage={percentage} />
    </Row>
  );
};

const GrayCardTitleContainer: React.FC<
  Pick<GrayCardProps, 'label' | 'loading'>
> = (props) => {
  const { label, loading } = props;

  return (
    <Row spacing="xs">
      <h4 className="c-gray-2 overflow-ellipses">{label}</h4>
      <Spinner dark show={loading} />
    </Row>
  );
};

/**
 * Displays a simple number and our statistic, including the percentage of
 * either growth or lack thereof.
 */
const GrayCard: React.FC<GrayCardProps> = (props) => {
  const { className, show } = props;

  if (show === false) return null;

  const css: string = cx('t-card--analytics', {}, className);

  return (
    <div className={css}>
      <GrayCardNumberContainer {...props} />
      <GrayCardTitleContainer {...props} />
    </div>
  );
};

export default GrayCard;
