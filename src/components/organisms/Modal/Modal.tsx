import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { ModalProps } from './Modal.types';
import ModalContainer from './ModalContainer';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
const ModalBackground: React.FC<Pick<ModalProps, 'lock'>> = ({ lock }) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const onClick = () => !lock && closeModal();
  const css = cx('c-modal-bg', { 'c-modal-bg--lock': lock });

  return <div key="c-modal-bg" className={css} onClick={onClick} />;
};

const ModalCancel: React.FC<Pick<ModalProps, 'lock'>> = ({ lock }) => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <Button className="c-modal-cancel" show={!lock} onClick={onClick}>
      <IoClose />
    </Button>
  );
};

const Modal: React.FC<ModalProps> = React.memo(
  ({ children, className, lock, id: modalId, show, ...containerProps }) => {
    const { confirmation } = containerProps?.options ?? {};
    const isShowing = useStoreState(({ modal }) => modal.isShowing);
    const id = useStoreState(({ modal }) => modal.id);

    const shouldShowModal = useMemo(() => isShowing && modalId === id, [
      isShowing,
      id,
      modalId
    ]);

    const css = cx('c-modal', {
      'c-modal--confirmation': confirmation,
      [className]: className
    });

    if (show === false) return null;

    return createPortal(
      <AnimatePresence>
        {shouldShowModal && (
          <>
            <ModalBackground lock={lock} />
            <ModalContainer {...containerProps}>
              <div className={css}>{children}</div>
            </ModalContainer>
            <ModalCancel lock={lock} />
          </>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

export default Modal;
