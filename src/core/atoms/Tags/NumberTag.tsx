import React from 'react';

import { ChildrenProps } from '@constants';

export default ({ children }: ChildrenProps) => {
  // Do an explicit null check, because if the value is 0, we still want it to
  // show.
  if (!children) return null;
  return <p className="c-tag-number">{children}</p>;
};
