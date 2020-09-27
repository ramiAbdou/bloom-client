/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButtonProps } from './Button.types';

export default ({
  className,
  disabled,
  onClick,
  title
}: PrimaryButtonProps) => {
  let buttonClassName = 'c-btn-primary ';
  buttonClassName += disabled ? 'c-btn-primary--disabled ' : '';
  buttonClassName += className;

  return (
    <button className={buttonClassName} onClick={() => !disabled && onClick()}>
      {title}
    </button>
  );
};
