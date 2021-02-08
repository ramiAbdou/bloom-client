import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import LocalModalContent from './LocalModalContent';
import ModalStore from './Modal.store';
import ModalContainer from './ModalContainer';

const LocalModal: React.FC = () => {
  const isShowing = ModalStore.useStoreState((store) => store.isShowing);

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

export default LocalModal;
