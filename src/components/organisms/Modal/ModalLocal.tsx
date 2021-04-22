import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@core/store/Store';
import LocalModalContent from './ModalLocalContent';

const ModalLocal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);

  return createPortal(
    <AnimatePresence>{isShowing && <LocalModalContent />}</AnimatePresence>,
    document.body
  );
};

export default ModalLocal;
