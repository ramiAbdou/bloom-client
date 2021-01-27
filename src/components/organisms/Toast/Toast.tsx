import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '@atoms/Button/Button';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { ToastOptions } from './Toast.types';
import useToastMutation from './useToastMutation';

const Toast: React.FC<ToastOptions> = ({
  id,
  message,
  mutationArgsOnComplete,
  mutationArgsOnUndo,
  onUndo
}) => {
  // Tracks the option to undo the action that created the Toast.
  const [wasUndid, setWasUndid] = useState(false);
  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  const { mutationOnUndoFn } = useToastMutation({
    id,
    mutationArgsOnComplete,
    wasUndid
  });

  const onUndoClick = async () => {
    setWasUndid(true);
    dequeueToast(id);
    if (mutationArgsOnUndo) await mutationOnUndoFn();
    if (onUndo) onUndo();
  };

  const showUndoButton = !!onUndo || !!mutationArgsOnUndo;
  const css = cx('c-toast', { 'c-toast--undo': showUndoButton });

  return (
    <motion.div
      key="toast"
      animate={{ x: 0 }}
      className={css}
      exit={{ opacity: 0, x: 250 }}
      initial={{ x: 150 }}
    >
      <p>{message}</p>

      <Button tertiary show={showUndoButton} onClick={onUndoClick}>
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
