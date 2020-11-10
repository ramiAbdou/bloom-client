/**
 * @fileoverview Component: Button
 * @author Rami Abdou
 */

import './Button.scss';

import React from 'react';

import { ChildrenProps, ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { ButtonProps } from './Button.types';

interface AbstractButtonProps
  extends ButtonProps,
    ChildrenProps,
    Partial<ValueProps> {}

export default ({
  className,
  children,
  onClick,
  title,
  ...props
}: AbstractButtonProps) => {
  const { css } = new CSSModifier()
    .class('c-btn')
    .addClass(!!className, className);

  return (
    <button className={css} onClick={onClick} {...props}>
      {children ?? title}
    </button>
  );
};
