import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import useBreakpoint from '@hooks/useBreakpoint';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import ModalContent from './ModalContent';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
const ModalBackground: React.FC = () => {
  const lock: boolean = useStoreState(({ modal }) => modal.options?.lock);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const onClick = () => !lock && closeModal();
  const css = cx('c-modal-bg', { 'c-modal-bg--lock': lock });

  return <div key="c-modal-bg" className={css} onClick={onClick} />;
};

const ModalExitButton: React.FC = () => {
  const lock: boolean = useStoreState(({ modal }) => modal.options?.lock);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <Button className="c-modal-cancel" show={!lock} onClick={onClick}>
      <IoClose />
    </Button>
  );
};

const ModalContainer: React.FC = () => {
  const onClose = useStoreState(({ modal }) => modal?.onClose);
  const sheet: boolean = useStoreState(({ modal }) => modal.options?.sheet);
  const width: number = useStoreState(({ modal }) => modal?.width);

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
    <>
      <ModalBackground />

      <motion.div
        animate={animate}
        className={css}
        exit={exit}
        initial={initial}
        style={width ? { width } : {}}
        transition={{ duration: 0.2 }}
      >
        <ModalContent />
      </motion.div>

      <ModalExitButton />
    </>
  );
};

export default ModalContainer;
