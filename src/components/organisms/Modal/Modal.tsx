import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import ModalStore from './Modal.store';
import ModalContainer from './ModalContainer';
import ModalContent from './ModalContent';

const Modal: React.FC = () => {
  const isShowing = ModalStore.useStoreState((store) => store.isShowing);

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
