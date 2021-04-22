import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useReactiveVar } from '@apollo/client';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import { globalModals } from './Modal.types';
import ModalContent from './ModalContent';

const Modal: React.FC = () => {
  const modalId: ModalType = useReactiveVar(modalVar)?.id;

  return createPortal(
    <AnimatePresence>
      {!!modalId && globalModals.includes(modalId) && <ModalContent />}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
