/**
 * @fileoverview Component: FlowContainer
 * - This controls the animation of the container of the Flow, which changes
 * for mobile and tablet/desktop.
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

interface ModalContainerProps extends ChildrenProps {
  onClose?: Function;
  width?: number;
}

export default ({ children, onClose, width }: ModalContainerProps) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);
  const animate = isMobile ? { x: 0 } : { opacity: 1, scale: 1 };
  const exit = isMobile ? { x: 1000 } : { opacity: 0, scale: 0.75 };
  const initial = isMobile ? { x: 1000 } : { opacity: 0.25, scale: 0.5 };

  // If it is desktop or tablet and click happens outside, close the flow.
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => closeModal());

  // We memoize the onClose function so that we don't continuously re-render.
  // The dep array is empty because the props will be present on component will
  // mount, which is where the onClose function enters.
  const memoizedOnClose = useCallback(() => {
    if (onClose) onClose();
  }, []);

  useEffect(() => {
    return () => {
      if (memoizedOnClose) memoizedOnClose();
    };
  }, [memoizedOnClose]);

  return (
    <motion.div
      ref={ref}
      animate={animate}
      className="c-modal"
      exit={exit}
      initial={initial}
      style={width ? { width } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
