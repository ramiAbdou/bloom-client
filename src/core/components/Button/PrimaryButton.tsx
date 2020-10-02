/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import React from 'react';

import CSSModifier from '@util/CSSModifier';
import { PrimaryButtonProps } from './Button.types';

export default ({
  className,
  disabled,
  onClick,
  title
}: PrimaryButtonProps) => {
  const { css } = new CSSModifier()
    .class('c-btn-primary')
    .class(className)
    .addClass(disabled, 'c-btn-primary--disabled');

  return (
    <button className={css} onClick={() => !disabled && onClick()}>
      {title}
    </button>
  );
};
