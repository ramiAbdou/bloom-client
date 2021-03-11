import React from 'react';

import useBreakpoint from '@hooks/useBreakpoint';
import { cx } from '@util/util';
import { RowProps } from './Row.types';

const Row: React.FC<RowProps> = (props) => {
  const {
    align = 'center',
    children,
    className,
    equal,
    fillBreakpoint,
    gap,
    justify,
    noMarginBottom,
    spacing,
    show,
    wrap
  } = props;

  const isTablet: boolean = useBreakpoint() <= 2;

  const css: string = cx(
    'flex t-row',
    {
      'f-ab': align === 'baseline',
      'f-ac': align === 'center',
      'flex-ae': align === 'end',
      'flex-as': align === 'start',
      'flex-c': justify === 'center',
      'flex-sb': justify === 'sb',
      'flex-w': !!wrap || !!gap,
      't-row--equal': equal,
      't-row--fill': fillBreakpoint === 2 && isTablet,
      't-row--gap-sm': gap === 'sm',
      't-row--gap-xs': gap === 'xs',
      't-row--gap-xxs': gap === 'xxs',
      't-row--spacing-sm': spacing === 'sm',
      't-row--spacing-xs': spacing === 'xs'
    },
    className
  );

  if (show === false) return null;

  return (
    <div className={css} style={noMarginBottom ? { marginBottom: 0 } : {}}>
      {children}
    </div>
  );
};

export default Row;
