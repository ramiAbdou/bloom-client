import { motion } from 'framer-motion';
import React from 'react';

import { makeClass } from '@util/util';
import Spinner from '../Loader/Spinner';
import Button, {
  ButtonLoadingProps,
  ButtonProps,
  useLoadingState
} from './Button';

const LoadingState = ({ loadingText }: ButtonLoadingProps) => (
  <motion.div className="c-btn-loading">
    <p>{loadingText}</p>
    <Spinner />
  </motion.div>
);

export default ({
  className,
  disabled,
  green,
  loading,
  loadingText,
  title,
  ...props
}: ButtonProps) => {
  // If the button is in it's loading state, it should be disabled.
  const showLoadingState = useLoadingState(loading);
  disabled = disabled || showLoadingState;

  const css = makeClass([
    'c-btn-primary',
    [green, 'c-btn-primary--green'],
    className
  ]);

  return (
    <Button className={css} disabled={disabled} {...props}>
      {showLoadingState ? <LoadingState loadingText={loadingText} /> : title}
    </Button>
  );
};
