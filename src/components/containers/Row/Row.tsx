import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps {
  align?: 'end' | 'start';
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
  spaceBetween
}) => {
  const css = cx('flex-ac', {
    [className]: className,
    'flex-ac': !align,
    'flex-ae': align === 'end',
    'flex-sb': spaceBetween,
    't-row--equal': equal,
    't-row--margin-top-auto': marginTopAuto
  });

  return <div className={css}>{children}</div>;
};

export default Row;
