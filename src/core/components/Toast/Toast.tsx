/**
 * @fileoverview Component: Toasts
 * - Bloom branded toast that slides in from the top of the screen for a few
 * seconds on confirmation of some arbitrary event.
 * @author Rami Abdou
 */

import './Toasts.scss';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { ANIMATION_DURATION, ToastOptions } from '@store/Toast.store';
import CSSModifier from '@util/CSSModifier';
import { check, x } from './images';

const Toast = ({ isError, message }: ToastOptions) => {
  const { css } = new CSSModifier()
    .class('c-toast')
    .addClass(isError, 'c-toast--error');

  return (
    <motion.div
      key="toast"
      animate={{ y: 0 }}
      className={css}
      exit={{ opacity: 0, y: -100 }}
      initial={{ y: -100 }}
      transition={{ duration: ANIMATION_DURATION / 1000 }}
    >
      <img alt="Toaster Icon" src={isError ? x : check} />
      <p>{message}</p>
    </motion.div>
  );
};

export default () => {
  const queue = useStoreState(({ toast }) => toast.queue);

  return createPortal(
    <div className="c-toast-ctr">
      <AnimatePresence>
        {queue.map(({ id, ...toast }) => (
          <Toast key={id} {...toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
