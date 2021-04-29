import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React from 'react';
import { IoClose } from 'react-icons/io5';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.state';
import useBreakpoint from '@hooks/useBreakpoint';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { cx } from '@util/util';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
const ModalBackground: React.FC = () => {
  const lock: boolean = useReactiveVar(modalVar)?.options?.lock;

  const onClick = (): void => {
    if (!lock) modalVar(null);
  };

  const css: string = cx('c-modal-bg', { 'c-modal-bg--lock': lock });

  return <div key="c-modal-bg" className={css} onClick={onClick} />;
};

const ModalExitButton: React.FC = () => {
  const lock: boolean = useReactiveVar(modalVar)?.options?.lock;

  const onClick = (): void => {
    modalVar(null);
  };

  return (
    <Button className="c-modal-cancel" show={!lock} onClick={onClick}>
      <IoClose />
    </Button>
  );
};

const ModalContainer: React.FC = ({ children }) => {
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

  const css: string = cx('c-modal-ctr', {
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
        style={{ width }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <ModalExitButton />
    </>
  );
};

export default ModalContainer;
