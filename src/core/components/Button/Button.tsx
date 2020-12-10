import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { ChildrenProps, ValueProps } from '@constants';
import { makeClass } from '@util/util';

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  href?: string;
  fill?: boolean;
  green?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  noScale?: boolean;
  noHover?: boolean;
  onClick?: Function;
  title?: string;
  target?: string;
};

export type ButtonLoadingProps = { loadingText: string };

interface AbstractButtonProps
  extends Partial<ButtonProps>,
    Partial<ChildrenProps>,
    Partial<ValueProps> {}

// This logic (including the local state) ensures that the loading state of
// a button doesn't show unless the operation takes more than 100ms.
export const useLoadingState = (loading: boolean) => {
  const [showLoadingState, setShowLoadingState] = useState(false);

  useEffect(() => {
    if (!loading && showLoadingState) setShowLoadingState(false);
    else {
      setTimeout(() => {
        if (loading && !showLoadingState) setShowLoadingState(true);
      }, 100);
    }
  }, [loading, showLoadingState]);

  return showLoadingState;
};

export default ({
  className,
  children,
  disabled,
  href,
  fill,
  large,
  noScale,
  noHover,
  onClick,
  title,
  target,
  ...props
}: AbstractButtonProps) => {
  const css = makeClass([
    'c-btn',
    [disabled, 'c-btn-disabled'],
    [large, 'c-btn--lg'],
    [fill, 'c-btn--fill'],
    [noHover, 'c-btn--no-hover'],
    className
  ]);

  // The core Bloom button animation, the scaling down!
  const tapAnimation =
    !disabled && !noScale ? { whileTap: { scale: 0.95 } } : {};

  const onAllowedClick = () => !disabled && onClick && onClick();

  if (href) {
    return (
      <motion.a
        className={css}
        href={href}
        target={target}
        {...tapAnimation}
        {...props}
      >
        {children ?? title}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={css}
      onClick={onAllowedClick}
      {...tapAnimation}
      {...props}
    >
      {children ?? title}
    </motion.button>
  );
};
