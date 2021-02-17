import React from 'react';

import { ClassNameProps, ShowProps } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { cx } from '@util/util';

interface RowProps extends ClassNameProps, ShowProps {
  align?: 'baseline' | 'center' | 'end' | 'start';
  columnBreakpoint?: 'M' | 'T';
  equal?: boolean;
  justify?: 'center' | 'sb';
  spacing?: 'xs' | 'sm';
  wrap?: boolean;
}

const Row: React.FC<RowProps> = ({
  align = 'center',
  children,
  columnBreakpoint,
  className,
  equal,
  justify,
  spacing = 'xs',
  show,
  wrap
}) => {
  const breakpoint = useBreakpoint();

  const css = cx('flex t-row', {
    [className]: className,
    'flex-ab': align === 'baseline',
    'flex-ac': align === 'center',
    'flex-ae': align === 'end',
    'flex-as': align === 'start',
    'flex-c': justify === 'center',
    'flex-sb': justify === 'sb',
    'flex-w': !!wrap,
    't-row--col':
      (columnBreakpoint === 'M' && breakpoint <= 1) ||
      (columnBreakpoint === 'T' && breakpoint <= 2),
    't-row--col-m': columnBreakpoint === 'M' && breakpoint <= 1,
    't-row--col-t': columnBreakpoint === 'T' && breakpoint <= 2,
    't-row--equal': equal,
    't-row--spacing-sm': spacing === 'sm',
    't-row--spacing-xs': spacing === 'xs'
  });

  return show !== false ? <div className={css}>{children}</div> : null;
};

export default Row;
