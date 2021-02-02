import React from 'react';

import { ChildrenProps, ClassNameProps, ShowProps } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps, ShowProps {
  align?: 'baseline' | 'end' | 'start';
  columnBreakpoint?: 'M' | 'T';
  equal?: boolean;
  marginTopAuto?: boolean;
  spaceBetween?: boolean;
  spacing?: 'xs' | 'sm';
}

const Row: React.FC<RowProps> = ({
  align,
  children,
  columnBreakpoint,
  className,
  equal,
  marginTopAuto,
  spaceBetween,
  spacing = 'xs',
  show
}) => {
  const breakpoint = useBreakpoint();

  const css = cx('flex t-row', {
    [className]: className,
    'flex-ab': align === 'baseline',
    'flex-ac': !align,
    'flex-ae': align === 'end',
    'flex-sb': spaceBetween,
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

  return show !== false ? <div className={css}>{children}</div> : null;
};

export default Row;
