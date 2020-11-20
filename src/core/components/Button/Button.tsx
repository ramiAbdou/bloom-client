/**
 * @fileoverview Component: Button
 * @author Rami Abdou
 */

import './Button.scss';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ChildrenProps, ValueProps } from '@constants';
import CSSModifier from '@util/CSSModifier';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  href?: string;
  fill?: boolean;
  green?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  onClick?: VoidFunction;
  title?: string;
};

export type ButtonLoadingProps = { loadingText: string };

interface AbstractButtonProps
  extends Partial<ButtonProps>,
    Partial<ChildrenProps>,
    Partial<ValueProps> {}

// This logic (including the local state) ensures that the loading state of
// a button doesn't show unless the operation takes more than 100ms.
export const useLoadingState = (loading: boolean) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!loading && showLoadingState) setShowLoadingState(false);
    else
      setTimeout(() => {
        if (loading && !showLoadingState) setShowLoadingState(true);
      }, 100);
  }, [loading, showLoadingState]);

  return showLoadingState;
};

export default ({
  className,
  children,
  disabled,
  href,
  fill,
  large,
  onClick,
  title
}: AbstractButtonProps) => {
  const { css } = new CSSModifier()
    .class('c-btn')
    .addClass(!!large, 'c-btn--lg')
    .addClass(!!fill, 'c-btn--fill')
    .addClass(!!className, className);

  // The core Bloom button animation, the scaling down!
  const tapAnimation = !disabled ? { whileTap: { scale: 0.95 } } : {};

  return (
    <motion.button
      className={css}
      onClick={() => !disabled && (href ? window.open(href) : onClick())}
      {...tapAnimation}
    >
      {children ?? title}
    </motion.button>
  );
};