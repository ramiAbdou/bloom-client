import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useReactiveVar } from '@apollo/client';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import { ModalType } from './Modal.types';
import ModalContent from './ModalContent';

const ModalPortal: React.FC = () => {
  const modalId: ModalType = useReactiveVar(modalVar)?.id;

  return createPortal(
    <AnimatePresence>{!!modalId && <ModalContent />}</AnimatePresence>,
    document.body
  );
};

export default ModalPortal;