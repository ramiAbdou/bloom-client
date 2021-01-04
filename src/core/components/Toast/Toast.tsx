import { AnimatePresence, motion } from 'framer-motion';
import { useMutation } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '@atoms/Button';
import { ToastOptions } from '@components/Toast/Toast.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';

const Toast = ({
  id,
  message,
  mutationOptionsOnClose,
  onUndo,
  type,
  undo
}: ToastOptions) => {
  // Since we have the option to undo the actions within Toasts, we keep track
  // of that state.
  const [wasUndid, setWasUndid] = useState(false);

  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  // If the mutationOptionsOnClose, we must call the useMutation hook. To
  // follow the rules of hooks, we have to pass something in, even if the
  // mutation query and variables are empty.
  mutationOptionsOnClose = mutationOptionsOnClose ?? ['', {}];
  const [mutation] = useMutation(...mutationOptionsOnClose);

  useEffect(() => {
    // We only show the toast for 5 seconds, then we remove it from the DOM.
    const timeout = setTimeout(async () => {
      // If the mutation string isn't empty, we execute the mutation.
      if (mutationOptionsOnClose[0]) await mutation();
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

  const css = makeClass([
    'c-toast',
    [type === 'ERROR', 'c-toast--error'],
    [type === 'PESSIMISTIC', 'c-toast--pessimistic'],
    [undo, 'c-toast--undo']
  ]);

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
      {undo && (
        <Button tertiary onClick={onUndoClick}>
          Undo
        </Button>
      )}
    </motion.div>
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
