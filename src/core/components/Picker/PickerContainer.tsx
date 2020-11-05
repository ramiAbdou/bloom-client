/**
 * @fileoverview Component: PickerContainer
 * - Only used in the mobile context and this behaves similar to our modals.
 * @author Rami Abdou
 */

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';

type PickerProps = { children: React.ReactNode };

export default ({ children }: PickerProps) => {
  const isShowing = useStoreState(({ picker }) => picker.isShowing);

  return createPortal(
    <AnimatePresence>
      {isShowing && (
        <>
          <motion.div
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            id="c-picker-bg"
            initial={{ opacity: 0 }}
          />
          <motion.div className="c-picker">{children}</motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
