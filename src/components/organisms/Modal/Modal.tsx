import {
  AnimatePresence,
  AnimationProps,
  motion,
  MotionProps
} from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ChildrenProps } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
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
      <IoClose />
    </Button>
  );
};

interface ModalContainerProps extends ChildrenProps {
  onClose?: VoidFunction;
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

  const isMobile = useBreakpoint() === 1;

  const animate: AnimationProps['animate'] = isMobile
    ? { opacity: 1, top: 'initial' }
    : { opacity: 1, scale: 1 };

  const exit: AnimationProps['exit'] = isMobile
    ? { opacity: 0, top: '100%' }
    : { opacity: 0, scale: 0.5 };

  const initial: MotionProps['initial'] = isMobile
    ? { opacity: 0.25 }
    : { opacity: 0.25, scale: 0.5 };

  return (
    <motion.div
      animate={animate}
      className="c-modal-ctr"
      exit={exit}
      initial={initial}
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

  const css = cx('c-modal', {
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
