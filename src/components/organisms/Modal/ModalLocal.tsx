import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { localModals } from './Modal.types';
import LocalModalContent from './ModalLocalContent';

const ModalLocal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const modalId = useStoreState(({ modal }) => modal.id);

  return createPortal(
    <AnimatePresence>
      {isShowing && localModals.includes(modalId) && <LocalModalContent />}
    </AnimatePresence>,
    document.body
  );
};

export default ModalLocal;
