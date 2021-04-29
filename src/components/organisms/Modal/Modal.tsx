import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React from 'react';

import { useReactiveVar } from '@apollo/client';
import useBreakpoint from '@hooks/useBreakpoint';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { cx } from '@util/util';
import { modalVar } from './Modal.state';
import ModalExitButton from './ModalExitButton';
import ModalOverlay from './ModalOverlay';

const Modal: React.FC = ({ children }) => {
  const className: string = useReactiveVar(modalVar)?.options?.className;
  const confirmation: boolean = useReactiveVar(modalVar)?.options?.confirmation;
  const sheet: boolean = useReactiveVar(modalVar)?.options?.sheet;
  const width: number = useReactiveVar(modalVar)?.width;

  useLockBodyScroll();

  const isMobile: boolean = useBreakpoint() === 1;

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

  const containerCss: string = cx('c-modal-ctr', {
    'c-modal-ctr--modal': !sheet && !isMobile,
    'c-modal-ctr--sheet': sheet ?? isMobile
  });

  const css: string = cx(
    'c-modal',
    { 'c-modal--confirmation': confirmation },
    className
  );

  return (
    <>
      <ModalOverlay />

      <motion.div
        animate={animate}
        className={containerCss}
        exit={exit}
        initial={initial}
        style={{ width }}
        transition={{ duration: 0.2 }}
      >
        <div className={css}>{children}</div>
      </motion.div>

      <ModalExitButton />
    </>
  );
};

export default Modal;
