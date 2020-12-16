import { motion } from 'framer-motion';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useState
} from 'react';

import { ChildrenProps, ValueProps } from '@constants';
import { makeClass } from '@util/util';

export interface ButtonProps
  extends Partial<ChildrenProps>,
    Partial<ValueProps> {
  className?: string;
  disabled?: boolean;
  href?: string;
  fill?: boolean;
  green?: boolean;
  loading?: boolean;
  loadingText?: string;
  large?: boolean;
  onClick?: Function;
  title?: string;
  target?: string;
}

export type ButtonLoadingProps = { loadingText: string };

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

export default forwardRef(
  (
    {
      className,
      children,
      disabled,
      href,
      fill,
      large,
      onClick,
      title,
      target,
      ...props
    }: ButtonProps,
    ref: MutableRefObject<any>
  ) => {
    const css = makeClass([
      'c-btn',
      [large, 'c-btn--lg'],
      [fill, 'c-btn--fill'],
      className
    ]);

    const onAllowedClick = () => !disabled && onClick && onClick();

    if (href) {
      return (
        <motion.a className={css} href={href} target={target} {...props}>
          {children ?? title}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={css}
        disabled={disabled}
        onClick={onAllowedClick}
        {...props}
      >
        {children ?? title}
      </motion.button>
    );
  }
);
