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

import { ToastOptions } from '@components/Toast/Toast.store';
import { useStoreActions, useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';

const Toast = ({ id, type, message }: ToastOptions) => {
  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);
  const onClick = () => dequeueToast(id);

  const { css } = new CSSModifier()
    .class('c-toast')
    .addClass(type === 'ERROR', 'c-toast--error')
    .addClass(type === 'PESSIMISTIC', 'c-toast--pessimistic');

  return (
    <motion.button
      key="toast"
      animate={{ x: 0 }}
      className={css}
      exit={{ opacity: 0, x: 250 }}
      initial={{ x: 150 }}
      onClick={onClick}
    >
      <p>{message}</p>
    </motion.button>
  );
};

export default () => {
  const queue = useStoreState(({ toast }) => toast.queue);

  return createPortal(
    <div className="c-toast-ctr">
      <AnimatePresence>
        {queue.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
