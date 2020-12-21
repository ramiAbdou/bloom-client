import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import ModalBackground from './components/Background';
import ModalContainer from './components/Container';
import { ModalProps } from './Modal.types';

export default ({
  confirmation,
  children,
  className,
  id: MODAL_ID,
  noClose,
  ...containerProps
}: ModalProps) => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const id = useStoreState(({ modal }) => modal.id);

  const shouldShowModal = useMemo(() => isShowing && MODAL_ID === id, [
    isShowing,
    id,
    MODAL_ID
  ]);

  const css = makeClass([
    'c-modal',
    [confirmation, 'c-modal--confirmation'],
    className
  ]);

  return createPortal(
    <AnimatePresence>
      {shouldShowModal && (
        <>
          <ModalBackground noClose={noClose} />
          <ModalContainer {...containerProps}>
            <div className={css}>{children}</div>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
