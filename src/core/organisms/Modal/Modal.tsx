import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircle } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ChildrenProps } from '@constants';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import { ModalProps } from './Modal.types';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
const ModalBackground: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();
  return <div key="c-modal-bg" className="c-modal-bg" onClick={onClick} />;
};

const ModalCancel: React.FC = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();
  return (
    <Button className="c-modal-cancel" onClick={onClick}>
      <IoCloseCircle />
    </Button>
  );
};

interface ModalContainerProps extends ChildrenProps {
  onClose?: Function;
  width?: number;
}

const ModalContainer: React.FC = ({
  children,
  onClose,
  width
}: ModalContainerProps) => {
  useLockBodyScroll();

  useEffect(() => {
    return () => onClose && onClose();
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="c-modal-ctr"
      exit={{ opacity: 0, scale: 0.5 }}
      initial={{ opacity: 0.25, scale: 0.5 }}
      style={width ? { width } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const Modal: React.FC<ModalProps> = ({
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

  const css = cx({
    'c-modal': true,
    'c-modal--confirmation': confirmation,
    [className]: className
  });

  return createPortal(
    <AnimatePresence>
      {shouldShowModal && (
        <>
          <ModalBackground />
          <ModalCancel />
          <ModalContainer {...containerProps}>
            <div className={css}>{children}</div>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
