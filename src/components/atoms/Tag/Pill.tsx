import React from 'react';

import { ChildrenProps, ShowProps } from '@constants';
import Show from '@containers/Show';
import { cx, takeFirst } from '@util/util';

interface PillProps extends ChildrenProps, ShowProps {
  percentage?: number;
  positive?: boolean;
}

const Pill: React.FC<PillProps> = ({
  children,
  percentage,
  positive,
  show
}) => {
  const isPositive = positive ?? percentage >= 0;

  if (percentage === undefined && positive === undefined) return null;

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

  return (
    <Show show={(percentage !== undefined || positive !== undefined) && show}>
      <p className={css}>{value}</p>
    </Show>
  );
};

export default Pill;
