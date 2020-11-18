/**
 * @fileoverview Component: Button
 * @author Rami Abdou
 */

import './Button.scss';

import { motion } from 'framer-motion';
import React from 'react';

import { ChildrenProps, ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  href?: string;
  fill?: boolean;
  loading?: boolean;
  green?: boolean;
  loadingText?: string;
  large?: boolean;
  onClick?: VoidFunction;
  title?: string;
};

export type ButtonLoadingProps = { loading?: boolean; loadingText?: string };

interface AbstractButtonProps
  extends ButtonProps,
    ChildrenProps,
    Partial<ValueProps> {}

export default ({
  className,
  children,
  disabled,
  href,
  fill,
  large,
  onClick,
  title,
  ...props
}: AbstractButtonProps) => {
  const { css } = new CSSModifier()
    .class('c-btn')
    .addClass(!!large, 'c-btn--lg')
    .addClass(!!fill, 'c-btn--fill')
    .addClass(!!className, className);

  const tapAnimation = !disabled ? { whileTap: { scale: 0.95 } } : {};

  return (
    <motion.button
      className={css}
      onClick={() => (href ? window.open(href) : onClick())}
      {...props}
      {...tapAnimation}
    >
      {children ?? title}
    </motion.button>
  );
};
