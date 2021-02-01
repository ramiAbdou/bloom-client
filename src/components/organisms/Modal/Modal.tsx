import {
  AnimatePresence,
  AnimationProps,
  motion,
  MotionProps
} from 'framer-motion';
import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Show from '@containers/Show';
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

const ModalContainer: React.FC = ({
  children,
  onClose,
  options
}: Pick<ModalProps, 'children' | 'onClose' | 'options'>) => {
  const { sheet, width } = options ?? {};
  useLockBodyScroll();

  useEffect(() => {
    return () => onClose && onClose();
  }, []);

  const isMobile = useBreakpoint() === 1;

  const animate: AnimationProps['animate'] =
    sheet ?? isMobile
      ? { opacity: 1, top: 'initial' }
      : { opacity: 1, scale: 1 };

  const exit: AnimationProps['exit'] =
    sheet ?? isMobile
      ? { opacity: 0, top: '100%' }
      : { opacity: 0, scale: 0.5 };

  const initial: MotionProps['initial'] =
    sheet ?? isMobile ? { opacity: 0.25 } : { opacity: 0.25, scale: 0.5 };

  const css = cx('c-modal-ctr', {
    'c-modal-ctr--modal': !sheet && !isMobile,
    'c-modal-ctr--sheet': sheet ?? isMobile
  });

  return (
    <motion.div
      animate={animate}
      className={css}
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
  children,
  className,
  lock,
  id: MODAL_ID,
  ...containerProps
}: ModalProps) => {
  const { confirmation } = containerProps?.options ?? {};
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
          <ModalBackground lock={lock} />
          <ModalCancel lock={lock} />

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
