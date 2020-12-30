import React from 'react';

import { ChildrenProps } from '@constants';

export default ({ children }: ChildrenProps) => {
  if (!children) return null;
  return <p className="c-form-desc">{children}</p>;
};
