/**
 * @fileoverview Component: FlowContainer
 * - This controls the animation of the container of the Flow, which changes
 * for mobile and tablet/desktop.
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React, { memo, useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

export default memo(({ children }: ChildrenProps) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClose = useStoreState(({ modal }) => modal.onClose);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);

  const animate = isMobile ? { x: 0 } : { opacity: 1, scale: 1 };
  const exit = isMobile ? { x: 1000 } : { opacity: 0, scale: 0.75 };
  const initial = isMobile ? { x: 1000 } : { opacity: 0.25, scale: 0.5 };

  // If it is desktop or tablet and click happens outside, close the flow.
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => closeModal());

  useEffect(() => {
    return () => onClose();
  }, []);

  return (
    <>
      <motion.div
        key="c-modal-ctr"
        animate={{ opacity: 0.5 }}
        className="c-modal-ctr"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      />

      <motion.div
        ref={ref}
        animate={animate}
        className="c-modal"
        exit={exit}
        initial={initial}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
});
