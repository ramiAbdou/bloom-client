import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps {
  gap?: 'sm';
  spaceBetween?: boolean;
}

const Row: React.FC<RowProps> = ({
  children,
  className,
  gap,
  spaceBetween
}) => {
  const css = cx({
    [className]: className,
    'flex-ac': true,
    'flex-sb': spaceBetween,
    't-row--gap-sm': gap === 'sm'
  });

  return <div className={css}>{children}</div>;
};

export default Row;
