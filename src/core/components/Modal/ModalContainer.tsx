import { motion } from 'framer-motion';
import React, { useCallback, useEffect } from 'react';

import { ChildrenProps } from '@constants';
import useLockBodyScroll from '@hooks/useLockBodyScroll';

interface ModalContainerProps extends ChildrenProps {
  onClose?: Function;
  width?: number;
}

export default ({ children, onClose, width }: ModalContainerProps) => {
  useLockBodyScroll();

  // We memoize the onClose function so that we don't continuously re-render.
  // The dep array is empty because the props will be present on component will
  // mount, which is where the onClose function enters.
  const memoizedOnClose = useCallback(() => {
    if (onClose) onClose();
  }, []);

  useEffect(() => {
    return () => {
      if (memoizedOnClose) memoizedOnClose();
    };
  }, [memoizedOnClose]);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="c-modal-ctr"
      exit={{ opacity: 0, scale: 0.75 }}
      initial={{ opacity: 0.25, scale: 0.5 }}
      style={width ? { width } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
