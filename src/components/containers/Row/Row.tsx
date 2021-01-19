import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps {
  align?: 'end' | 'start';
  gap?: 'sm';
  spaceBetween?: boolean;
}

const Row: React.FC<RowProps> = ({
  align,
  children,
  className,
  gap,
  spaceBetween
}) => {
  const css = cx('flex-ac', {
    [className]: className,
    'flex-ac': !align,
    'flex-ae': align === 'end',
    'flex-sb': spaceBetween,
    't-row--gap-sm': gap === 'sm'
  });

  return <div className={css}>{children}</div>;
};

export default Row;
