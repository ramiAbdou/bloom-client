import React from 'react';

import { cx } from '@util/util';

interface PillProps {
  percentage: number;
}

const Pill: React.FC<PillProps> = ({ percentage }) => {
  const isPositive = percentage >= 0;

  const css = cx({
    'c-tag-pill': true,
    'c-tag-pill--negative': !isPositive,
    'c-tag-pill--positive': isPositive
  });

  // If positive, add the "+" character, but otherwise TS will automatically
  // add a "-" character.
  const percentageString = isPositive ? `+${percentage}%` : `${percentage}%`;
  return <p className={css}>{percentageString}</p>;
};

export default Pill;
