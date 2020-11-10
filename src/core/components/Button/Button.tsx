/**
 * @fileoverview Component: Button
 * @author Rami Abdou
 */

import './Button.scss';

import React from 'react';

import { ChildrenProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import { ButtonProps } from './Button.types';

interface AbstractButtonProps extends ButtonProps, ChildrenProps {}

export default ({
  className,
  children,
  onClick,
  title
}: AbstractButtonProps) => {
  const { css } = new CSSModifier()
    .class('c-btn')
    .addClass(!!className, className);

  return (
    <button className={css} onClick={onClick}>
      {children ?? title}
    </button>
  );
};
