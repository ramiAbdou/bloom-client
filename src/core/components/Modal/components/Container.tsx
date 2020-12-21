import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { ChildrenProps } from '@constants';
import useLockBodyScroll from '@hooks/useLockBodyScroll';

interface ModalContainerProps extends ChildrenProps {
  onClose?: Function;
  width?: number;
}

export default ({ children, onClose, width }: ModalContainerProps) => {
  useLockBodyScroll();

  useEffect(() => {
    return () => {
      if (onClose) onClose();
    };
  }, []);

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
