import React from 'react';

import { ChildrenProps, ShowProps } from '@constants';

interface HeaderTagProps extends ChildrenProps, ShowProps {}

const HeaderTag: React.FC<HeaderTagProps> = ({ children, show }) => {
  // Do an explicit null check, because if the value is 0, we still want it to
  // show.
  if (!children || show === false) return null;
  return <p className="c-tag-number">{children}</p>;
};

export default HeaderTag;
