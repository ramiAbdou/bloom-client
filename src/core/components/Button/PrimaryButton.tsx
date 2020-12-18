import React from 'react';

import { makeClass } from '@util/util';
import Button from './Button';
import { PrimaryButtonProps } from './Button.types';

export default ({ className, green, ...props }: PrimaryButtonProps) => {
  const css = makeClass([
    'c-btn-primary',
    [green, 'c-btn-primary--green'],
    className
  ]);

  return <Button className={css} {...props} />;
};
