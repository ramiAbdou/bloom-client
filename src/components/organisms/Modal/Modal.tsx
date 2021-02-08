import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import ModalContainer from './ModalContainer';

const Modal: React.FC = () => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  // const id = useStoreState(({ modal }) => modal.id);

  // const css = cx('c-modal', {
  //   'c-modal--confirmation': confirmation,
  //   [className]: className
  // });

  // if (show === false) return null;
  // return null;

  return createPortal(
    <AnimatePresence>
      {isShowing && (
        <>
          <ModalContainer />
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
