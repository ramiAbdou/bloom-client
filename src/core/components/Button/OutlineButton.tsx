/**
 * @fileoverview Component: OutlineButton
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import CSSModifier from '@util/CSSModifier';
import Spinner from '../Loader/Spinner';
import Button from './Button';
import { ButtonLoadingProps, ButtonProps } from './Button.types';

const LoadingState = ({ loadingText }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    {loadingText && <p>{loadingText}</p>}
    <Spinner />
  </motion.div>
);

export interface OutlineButtonProps extends ButtonProps, ButtonLoadingProps {}

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
    <Button className={css} onClick={() => !isLoading && onClick()}>
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
