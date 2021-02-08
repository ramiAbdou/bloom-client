import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import ModalStore from './Modal.store';
import ModalContainer from './ModalContainer';
import LocalModalContent from './ModalLocalContent';

const ModalLocal: React.FC = () => {
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

export default ModalLocal;
