import React from 'react';

import { ClassNameProps, ShowProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ClassNameProps, ShowProps {
  align?: 'baseline' | 'center' | 'end' | 'start';
  equal?: boolean;
  gap?: 'xxs' | 'xs' | 'sm';
  justify?: 'center' | 'sb';
  spacing?: 'xs' | 'sm';
  wrap?: boolean;
}

const Row: React.FC<RowProps> = ({
  align = 'center',
  children,
  className,
  equal,
  gap,
  justify,
  spacing,
  show,
  wrap
}) => {
  const css = cx(
    'flex t-row',
    {
      'flex-ab': align === 'baseline',
      'flex-ac': align === 'center',
      'flex-ae': align === 'end',
      'flex-as': align === 'start',
      'flex-c': justify === 'center',
      'flex-sb': justify === 'sb',
      'flex-w': !!wrap,
      't-row--equal': equal,
      't-row--gap-sm': wrap && gap === 'sm',
      't-row--gap-xs': wrap && gap === 'xs',
      't-row--gap-xxs': wrap && gap === 'xxs',
      't-row--spacing-sm': spacing === 'sm',
      't-row--spacing-xs': spacing === 'xs'
    },
    className
  );

  return show !== false ? <div className={css}>{children}</div> : null;
};

export default Row;
