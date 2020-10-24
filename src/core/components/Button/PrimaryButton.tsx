/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import React from 'react';

import CSSModifier from '@util/CSSModifier';
import ButtonProvider from './ButtonState';
import { ButtonDisabledProps, ButtonProps } from './ButtonTypes';

interface PrimaryButtonProps extends ButtonProps, ButtonDisabledProps {}

const PrimaryButtonContent = ({
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

export default (props: PrimaryButtonProps) => (
  <ButtonProvider>
    <PrimaryButtonContent {...props} />
  </ButtonProvider>
);
