/**
 * @fileoverview Component: FlowContainer
 * - This controls the animation of the container of the Flow, which changes
 * for mobile and tablet/desktop.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ChildrenProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';

export default ({ children }: ChildrenProps) => {
  const closeFlow = useStoreActions(({ flow }) => flow.closeFlow);
  const isShowing = useStoreState(({ flow }) => flow.isShowing);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);

  const animate = isMobile ? { x: 0 } : { y: 0 };
  const exit = isMobile ? { x: 1000 } : { y: -1000 };
  const initial = isMobile ? { x: 1000 } : { y: -1000 };
  const transition = isMobile ? { duration: 0.3 } : { duration: 0.5 };

  // If it is desktop or tablet and click happens outside, close the flow.
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, (event) => {
    // @ts-ignore b/c we know that an ID string will exist.
    const { id } = event.target;
    if (id === 'c-flow-root') closeFlow();
  });

  return (
    <AnimatePresence>
      {isShowing && (
        <>
          <motion.div
            ref={ref}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            id="c-flow-bg"
            initial={{ opacity: 0 }}
          />
          <div id="c-flow-root">
            <motion.div
              animate={animate}
              className="c-flow"
              exit={exit}
              initial={initial}
              transition={transition}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
