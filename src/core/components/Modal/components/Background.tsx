import { motion } from 'framer-motion';
import React from 'react';

import { useStoreActions } from '@store/Store';
import { ModalProps } from '../Modal.types';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
export default ({ noClose }: Pick<ModalProps, 'noClose'>) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const onClick = () => {
    if (!noClose) closeModal();
  };

  return (
    <motion.div
      key="c-modal-bg"
      animate={{ opacity: 0.5 }}
      className="c-modal-bg"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
    />
  );
};
