import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import ModalStore from './LocalModal.store';
import LocalModalContainer from './LocalModalContainer';

const LocalModal: React.FC = () => {
  const isShowing = ModalStore.useStoreState((store) => store.isShowing);

  return createPortal(
    <AnimatePresence>{isShowing && <LocalModalContainer />}</AnimatePresence>,
    document.body
  );
};

export default LocalModal;
