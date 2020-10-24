/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import {
  ButtonDisabledProps,
  ButtonLoadingProps,
  ButtonProps
} from './Button.types';
import Spinner from './Spinner';

const LoadingState = ({ text }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    {text && <p>{text}</p>}
    <Spinner />
  </motion.div>
);

export interface PrimaryButtonProps extends ButtonProps, ButtonDisabledProps {}

export default ({
  className,
  disabled,
  isLoading,
  loadingText,
  onClick,
  title
}: PrimaryButtonProps) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (isLoading) setShowLoadingState(true);
    }, 100);

    return clearTimeout(timeout);
  });

  const { css } = new CSSModifier()
    .class('c-btn-primary')
    .class(className)
    .addClass(disabled, 'c-btn-primary--disabled')
    .addClass(isLoading, 'c-btn--primary--loading');

  disabled = disabled || showLoadingState;

  return (
    <motion.button
      className={css}
      transition={{ duration: 1 }}
      onClick={() => !disabled && !isLoading && onClick()}
    >
      {showLoadingState ? <LoadingState text={loadingText} /> : title}
    </motion.button>
  );
};
