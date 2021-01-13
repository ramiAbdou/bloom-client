import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps {
  spaceBetween?: boolean;
}

const Row: React.FC<RowProps> = ({ children, className, spaceBetween }) => {
  const css = cx({
    [className]: className,
    'flex-ac': true,
    'flex-sb': spaceBetween
  });

  return <div className={css}>{children}</div>;
};

export default Row;
