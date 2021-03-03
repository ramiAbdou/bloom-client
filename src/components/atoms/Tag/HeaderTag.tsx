import React from 'react';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';

const HeaderTag: React.FC<BaseProps> = ({ children, className, show }) => {
  // Do an explicit null check, because if the value is 0, we still want it to
  // show.
  if (!children || show === false) return null;
  const css = cx('c-tag-number', { [className]: className });
  return <p className={css}>{children}</p>;
};

export default HeaderTag;
