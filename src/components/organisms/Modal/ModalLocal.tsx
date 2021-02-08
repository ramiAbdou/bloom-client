import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { localModals } from './Modal.types';
import ModalContainer from './ModalContainer';
import LocalModalContent from './ModalLocalContent';

const ModalLocal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const modalId = useStoreState(({ modal }) => modal.id);
  if (!localModals.includes(modalId)) return null;

  return createPortal(
    <AnimatePresence>
      {isShowing && (
        <>
          <ModalContainer>
            <LocalModalContent />
          </ModalContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalLocal;
