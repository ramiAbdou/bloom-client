import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

import {
  ChildrenProps,
  ClassNameProps,
  Function,
  IdProps,
  StyleProps
} from '@constants';
import { useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import ModalBackground from './ModalBackground';
import ModalContainer from './ModalContainer';

interface ModalProps
  extends IdProps,
    ChildrenProps,
    ClassNameProps,
    StyleProps {
  confirmation?: boolean;
  onClose?: Function;
  width?: number;
}

export default ({
  confirmation,
  children,
  className,
  id: MODAL_ID,
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
          <ModalBackground />
          <ModalContainer {...containerProps}>
            <div className={css}>{children}</div>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
