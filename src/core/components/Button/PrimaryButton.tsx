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
  keepColor,
  loading,
  loadingText,
  onClick,
  title,
  ...props
}: ButtonProps) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!loading && showLoadingState) setShowLoadingState(false);
    else
      setTimeout(() => {
        if (loading && !showLoadingState) setShowLoadingState(true);
      }, 100);
  }, [loading, showLoadingState]);

  disabled = disabled || showLoadingState;

  const { css } = new CSSModifier()
    .class('c-btn-primary')
    .class(className)
    .addClass(disabled, 'c-btn-primary--disabled')
    .addClass(keepColor, 'c-btn-primary--keep-color');

  return (
    <Button
      className={css}
      disabled={disabled}
      onClick={() => !disabled && !loading && onClick()}
      {...props}
    >
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
