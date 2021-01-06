import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';

interface RowProps extends ChildrenProps, ClassNameProps {}

const Row: React.FC<RowProps> = ({ children, className }) => {
  const css = cx({ [className]: className, 'flex-ac': true });
  return <div className={css}>{children}</div>;
};

export default Row;
