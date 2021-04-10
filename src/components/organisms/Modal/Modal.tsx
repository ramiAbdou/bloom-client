import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@core/store/Store';
import { globalModals } from './Modal.types';
import ModalContent from './ModalContent';

const Modal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const modalId = useStoreState(({ modal }) => modal.id);

  return createPortal(
    <AnimatePresence>
      {isShowing && globalModals.includes(modalId) && <ModalContent />}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
