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

  const { css } = new CSSModifier().class('c-btn-underline').class(className);

  return (
    <Button className={css} onClick={() => !loading && onClick()} {...props}>
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
