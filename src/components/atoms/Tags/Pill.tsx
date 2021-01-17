import React from 'react';

import { ChildrenProps } from '@constants';
import { cx, takeFirst } from '@util/util';

interface PillProps extends ChildrenProps {
  percentage?: number;
  positive?: boolean;
}

const Pill: React.FC<PillProps> = ({ children, percentage, positive }) => {
  const isPositive = positive ?? percentage >= 0;

  // If positive, add the "+" character, but otherwise TS will automatically
  // add a "-" character.
  const value = takeFirst([
    [percentage === undefined, children],
    [percentage && isPositive, `+${percentage}%`],
    [percentage && !isPositive, `${percentage}%`]
  ]);

  const css = cx('c-tag-pill', {
    'c-tag-pill--negative': !isPositive,
    'c-tag-pill--positive': isPositive
  });

  return <p className={css}>{value}</p>;
};

export default Pill;
