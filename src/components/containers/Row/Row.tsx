import React from 'react';

import { ClassNameProps, ShowProps } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { cx } from '@util/util';

interface RowProps extends ClassNameProps, ShowProps {
  align?: 'baseline' | 'center' | 'end' | 'start';
  columnBreakpoint?: 'M' | 'T';
  equal?: boolean;
  justify?: 'center';
  marginBottom?: number;
  marginTopAuto?: boolean;
  spaceBetween?: boolean;
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
  marginBottom,
  marginTopAuto,
  spaceBetween,
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
    'flex-sb': spaceBetween,
    'flex-w': !!wrap,
    't-row--c': justify === 'center',
    't-row--col':
      (columnBreakpoint === 'M' && breakpoint <= 1) ||
      (columnBreakpoint === 'T' && breakpoint <= 2),
    't-row--col-m': columnBreakpoint === 'M' && breakpoint <= 1,
    't-row--col-t': columnBreakpoint === 'T' && breakpoint <= 2,
    't-row--equal': equal,
    't-row--margin-top-auto': marginTopAuto,
    't-row--spacing-sm': spacing === 'sm',
    't-row--spacing-xs': spacing === 'xs'
  });

  return show !== false ? (
    <div className={css} style={{ marginBottom }}>
      {children}
    </div>
  ) : null;
};

export default Row;
