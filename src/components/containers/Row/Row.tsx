import React from 'react';

import { ChildrenProps, ClassNameProps, ShowProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps, ShowProps {
  align?: 'baseline' | 'end' | 'start';
  equal?: boolean;
  marginTopAuto?: boolean;
  spaceBetween?: boolean;
}

const Row: React.FC<RowProps> = ({
  align,
  children,
  className,
  equal,
  marginTopAuto,
  spaceBetween,
  show
}) => {
  const css = cx('flex t-row', {
    [className]: className,
    'flex-ab': align === 'baseline',
    'flex-ac': !align,
    'flex-ae': align === 'end',
    'flex-sb': spaceBetween,
    't-row--equal': equal,
    't-row--margin-top-auto': marginTopAuto
  });

  return show !== false ? <div className={css}>{children}</div> : null;
};

export default Row;
