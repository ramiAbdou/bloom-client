import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React from 'react';

import useBreakpoint from '@hooks/useBreakpoint';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { cx } from '@util/util';
import ModalExitButton from './ModalExitButton';
import ModalOverlay from './ModalOverlay';

interface ModalProps {
  className?: string;
  sheet?: boolean;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ className, children, sheet, style }) => {
  useLockBodyScroll();

  const isMobile: boolean = useBreakpoint() === 1;

  const animate: AnimationProps['animate'] =
    sheet ?? isMobile
      ? { opacity: 1, top: 'initial' }
      : { opacity: 1, scale: 1 };

  const initial: MotionProps['initial'] =
    sheet ?? isMobile ? { opacity: 0.25 } : { opacity: 0.25, scale: 0.5 };

  const containerCss: string = cx('c-modal-ctr', {
    'c-modal-ctr--modal': !sheet && !isMobile,
    'c-modal-ctr--sheet': sheet ?? isMobile
  });

  const css: string = cx('c-modal', {}, className);

  return (
    <>
      <ModalOverlay />

      <motion.div
        animate={animate}
        className={containerCss}
        initial={initial}
        style={style}
        transition={{ duration: 0.2 }}
      >
        <div className={css}>{children}</div>
      </motion.div>

      <ModalExitButton />
    </>
  );
};

export default Modal;
