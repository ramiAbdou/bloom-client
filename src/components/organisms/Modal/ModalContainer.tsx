import { AnimationProps, motion, MotionProps } from 'framer-motion';
import React, { useEffect } from 'react';

import useBreakpoint from '@hooks/useBreakpoint';
import useLockBodyScroll from '@hooks/useLockBodyScroll';
import { cx } from '@util/util';
import { ModalProps } from './Modal.types';

const ModalContainer: React.FC<Pick<ModalProps, 'onClose' | 'options'>> = ({
  children,
  onClose,
  options
}) => {
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

export default ModalContainer;
