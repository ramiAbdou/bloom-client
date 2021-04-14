import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useStoreActions, useStoreState } from '@core/store/Store';
import { ToastOptions } from './Toast.types';

const Toast: React.FC<ToastOptions> = ({ id, message }) => {
  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  useEffect(() => {
    // We only show the toast for 5 seconds, then we remove it from the DOM.
    const timeout = setTimeout(async () => {
      dequeueToast(id);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
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
};

const ToastList: React.FC = () => {
  const queue: ToastOptions[] = useStoreState(({ toast }) => toast.queue);

  return createPortal(
    <div className="c-toast-ctr">
      <AnimatePresence>
        {queue.map((toast: ToastOptions) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastList;
