/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Spinner from '../Loader/Spinner';
import Button, { ButtonLoadingProps, ButtonProps } from './Button';

const LoadingState = ({ loadingText }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    {loadingText && <p>{loadingText}</p>}
    <Spinner />
  </motion.div>
);

export default ({
  className,
  disabled,
  green,
  isLoading,
  loadingText,
  onClick,
  title,
  ...props
}: ButtonProps) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!isLoading && showLoadingState) setShowLoadingState(false);
    else
      setTimeout(() => {
        if (isLoading && !showLoadingState) setShowLoadingState(true);
      }, 100);
  }, [isLoading, showLoadingState]);

  disabled = disabled || showLoadingState;

  const { css } = new CSSModifier()
    .class('c-btn-primary')
    .class(className)
    .addClass(!!green, 'c-btn-primary--green')
    .addClass(disabled, 'c-btn-primary--disabled');

  return (
    <Button
      className={css}
      disabled={disabled}
      onClick={() => !disabled && !isLoading && onClick()}
      {...props}
    >
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
