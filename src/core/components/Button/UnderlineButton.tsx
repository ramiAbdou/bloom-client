/**
 * @fileoverview Component: UnderlineButton
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

  const { css } = new CSSModifier().class('c-btn-underline').class(className);

  return (
    <Button className={css} onClick={() => !isLoading && onClick()} {...props}>
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
