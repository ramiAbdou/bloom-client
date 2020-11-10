/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Spinner from '../Loader/Spinner';
import Button from './Button';
import {
  ButtonDisabledProps,
  ButtonLoadingProps,
  ButtonProps
} from './Button.types';

const LoadingState = ({ loadingText }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    {loadingText && <p>{loadingText}</p>}
    <Spinner />
  </motion.div>
);

export interface PrimaryButtonProps
  extends ButtonProps,
    ButtonLoadingProps,
    ButtonDisabledProps {}

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
    .addClass(disabled, 'c-btn-primary--disabled');

  return (
    <Button
      className={css}
      onClick={() => !disabled && !isLoading && onClick()}
    >
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
