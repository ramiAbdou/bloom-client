/**
 * @fileoverview Component: OutlineButton
 * @author Rami Abdou
 */

import './Button.scss';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Spinner from '../Loader/Spinner';
import { ButtonLoadingProps, ButtonProps } from './Button.types';

const LoadingState = ({ text }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    {text && <p>{text}</p>}
    <Spinner />
  </motion.div>
);

export type OutlineButtonProps = ButtonProps;

export default ({
  className,
  isLoading,
  loadingText,
  onClick,
  title
}: OutlineButtonProps) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!isLoading && showLoadingState) setShowLoadingState(false);
    else
      setTimeout(() => {
        if (isLoading && !showLoadingState) setShowLoadingState(true);
      }, 100);
  }, [isLoading, showLoadingState]);

  const { css } = new CSSModifier().class('c-btn-outline').class(className);

  return (
    <motion.button
      className={css}
      transition={{ duration: 1 }}
      onClick={() => !isLoading && onClick()}
    >
      {showLoadingState ? <LoadingState text={loadingText} /> : title}
    </motion.button>
  );
};
