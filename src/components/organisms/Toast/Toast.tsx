import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastData, toastQueueVar, useToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';

const Toast: React.FC<ToastData> = ({ id, message }) => {
  const { dequeueToast } = useToast(toastQueueVar);

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
  const toastQueue: ToastData[] = useReactiveVar(toastQueueVar);

  return createPortal(
    <div className="c-toast-ctr">
      <AnimatePresence>
        {toastQueue.map((toast: ToastData) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ToastList;
