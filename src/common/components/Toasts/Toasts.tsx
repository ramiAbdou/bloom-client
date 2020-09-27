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

import { checkWhite } from './images';
import { ANIMATION_DURATION, ToastOptions, useToasts } from './Toasts.state';

const Toast = ({ icon, message }: ToastOptions) => (
  <motion.div
    key="toast"
    animate={{ y: 0 }}
    className="c-toast"
    exit={{ opacity: 0, y: -100 }}
    initial={{ y: -100 }}
    transition={{ duration: ANIMATION_DURATION / 1000 }}
  >
    <img
      alt="Toaster Icon"
      className="c-toast__icon"
      src={icon || checkWhite}
    />
    <p className="c-toast__msg">{message}</p>
  </motion.div>
);

export default () => {
  const { queue } = useToasts();

  return createPortal(
    <div className="c-toast-ctr">
      <AnimatePresence>
        {queue.map(({ id, icon, message }) => (
          <Toast key={id} icon={icon} message={message} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
