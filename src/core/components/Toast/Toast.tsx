import { AnimatePresence, motion } from 'framer-motion';
import { useMutation } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import UnderlineButton from '@components/Button/UnderlineButton';
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
  const [wasUndid, setWasUndid] = useState(false);
  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  mutationOptionsOnClose = mutationOptionsOnClose ?? ['', {}];
  const [mutation] = useMutation(...mutationOptionsOnClose);

  useEffect(() => {
    // We only show the toast for 5 seconds, then we remove it from the DOM.
    const timeout = setTimeout(async () => {
      if (mutationOptionsOnClose[0]) await mutation();
      dequeueToast(id);
    }, 5000);

    (async () => {
      if (wasUndid) await onUndo();
    })();

    return () => {
      if (wasUndid) clearTimeout(timeout);
    };
  }, [wasUndid]);

  const css = makeClass([
    'c-toast',
    [type === 'ERROR', 'c-toast--error'],
    [type === 'PESSIMISTIC', 'c-toast--pessimistic'],
    [!!undo, 'c-toast--undo']
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
      {undo && <UnderlineButton title="Undo" onClick={onUndoClick} />}
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
