import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@core/store/Store';
import { ToastOptions } from './Toast.types';

const Toast: React.FC<ToastOptions> = ({ message }) => (
  <motion.div
    key="toast"
    animate={{ x: 0 }}
    className="c-toast"
    exit={{ opacity: 0, x: 250 }}
    initial={{ x: 150 }}
  >
    <p>{message}</p>
  </motion.div>
);

const ToastList: React.FC = () => {
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

export default ToastList;
