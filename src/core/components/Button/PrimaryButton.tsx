/**
 * @fileoverview Component: PrimaryButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { useHover } from '@hooks/useHover';
import { useStoreState } from '@store/Store';
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
  primaryColor,
  small,
  title
}: PrimaryButtonProps) => {
  const [showLoadingState, setShowLoadingState] = useState(false);
  const [hoverRef, isHovered] = useHover();

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
    .addClass(disabled, 'c-btn-primary--disabled')
    .addClass(small, 'c-btn-primary--sm');

  // If the primaryColor is passed in, then use that and if not, use the global
  // primaryColor. Note that one of these two options MUST return non-null to
  // display
  primaryColor = primaryColor ?? useStoreState((store) => store?.primaryColor);
  const customStyle = !disabled
    ? {
        backgroundColor: primaryColor + (isHovered ? '33' : '1A'),
        color: primaryColor
      }
    : {};

  return (
    <motion.button
      ref={hoverRef}
      className={css}
      style={customStyle}
      transition={{ duration: 1 }}
      onClick={() => !disabled && !isLoading && onClick()}
    >
      {showLoadingState ? <LoadingState text={loadingText} /> : title}
    </motion.button>
  );
};
