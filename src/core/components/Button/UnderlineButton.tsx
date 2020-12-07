import React from 'react';

import { makeClass } from '@util/util';
import Button, { ButtonProps } from './Button';

export default ({ className, ...props }: ButtonProps) => {
  const css = makeClass(['c-btn-underline', className]);
  return <Button className={css} {...props} />;
};
