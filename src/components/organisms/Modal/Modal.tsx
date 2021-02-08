import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { globalModals } from './Modal.types';
import ModalContainer from './ModalContainer';
import ModalContent from './ModalContent';

const Modal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const modalId = useStoreState(({ modal }) => modal.id);

  if (!globalModals.includes(modalId)) return null;

  return createPortal(
    <AnimatePresence>
      {isShowing && (
        <>
          <ModalContainer>
            <ModalContent />
          </ModalContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
