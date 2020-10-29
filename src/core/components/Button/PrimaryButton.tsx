/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Form from '@components/Form/Form.store';
import CSSModifier from '@util/CSSModifier';
import Spinner from '../Loader/Spinner';
import {
  ButtonDisabledProps,
  ButtonLoadingProps,
  ButtonProps
} from './Button.types';

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
  const primaryColor = Form.useStoreState((store) => store.primaryColor);
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

  const style = !disabled ? { background: primaryColor } : {};

  return (
    <motion.button
      className={css}
      style={style}
      transition={{ duration: 1 }}
      onClick={() => !disabled && !isLoading && onClick()}
    >
      {showLoadingState ? <LoadingState text={loadingText} /> : title}
    </motion.button>
  );
};
