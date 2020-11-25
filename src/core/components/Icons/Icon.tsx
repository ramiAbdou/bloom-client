/**
 * @fileoverview Component: Icon
 * @author Rami Abdou
 */

import React from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

export interface IconProps extends ChildrenProps, ClassNameProps {}

export default ({ className, children }: IconProps) => {
  const { css } = new CSSModifier()
    .class('ionicon')
    .class('react-icon')
    .addClass(!!className, className);

  return (
    <svg
      className={css}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};
