import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@core/store/Store';
import { ModalType } from '@util/constants';
import { globalModals } from './Modal.types';
import ModalContent from './ModalContent';

const Modal: React.FC = () => {
  const isShowing: boolean = useStoreState(({ modal }) => modal.isShowing);
  const modalId: ModalType = useStoreState(({ modal }) => modal.id);

  return createPortal(
    <AnimatePresence>
      {isShowing && globalModals.includes(modalId) && <ModalContent />}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
