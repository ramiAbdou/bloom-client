import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { ToastOptions } from './Toast.types';

const Toast: React.FC<ToastOptions> = ({
  id,
  message,
  mutationArgs,
  onUndo
}) => {
  // Since we have the option to undo the actions within Toasts, we keep track
  // of that state.
  const [wasUndid, setWasUndid] = useState(false);

  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  // If the mutationOptionsOnClose, we must call the useMutation hook. To
  // follow the rules of hooks, we have to pass something in, even if the
  // mutation query and variables are empty.
  const [mutationFn] = useMutation(mutationArgs ?? { name: null, query: null });

  useEffect(() => {
    // We only show the toast for 5 seconds, then we remove it from the DOM.
    const timeout = setTimeout(async () => {
      // If the mutation string isn't empty, we execute the mutation.
      if (mutationArgs?.name) await mutationFn();
      dequeueToast(id);
    }, 5000);

    if (wasUndid) onUndo();

    return () => {
      // If the Toast was already undid, then in this cleanup function, we
      // clear the timeout that would've executed the mutation and removed
      // the toast.
      if (wasUndid) clearTimeout(timeout);
    };
  }, [wasUndid]);

  const css = cx('c-toast', { 'c-toast--undo': !!onUndo });

  const onUndoClick = () => {
    setWasUndid(true);
    dequeueToast(id);
  };

  return (
    <motion.div
      key="toast"
      animate={{ x: 0 }}
      className={css}
      exit={{ opacity: 0, x: 250 }}
      initial={{ x: 150 }}
    >
      <p>{message}</p>

      <Button tertiary show={!!onUndo} onClick={onUndoClick}>
        Undo
      </Button>
    </motion.div>
  );
};

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
