import React from 'react';

import { makeClass } from '@util/util';
import Button from './Button';
import { ButtonProps } from './Button.types';

export default ({ className, ...props }: ButtonProps) => {
  const css = makeClass(['c-btn-outline', [className, className]]);
  return <Button className={css} {...props} />;
};
