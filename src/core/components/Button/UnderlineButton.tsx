import React from 'react';

import CSSModifier from '@util/CSSModifier';
import Button, { ButtonProps } from './Button';

export default ({ className, ...props }: ButtonProps) => {
  const { css } = new CSSModifier().class('c-btn-underline').class(className);

  return <Button className={css} {...props} />;
};
