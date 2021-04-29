import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { cx } from '@util/util';
import { closeModal, modalVar } from './Modal.state';

/**
 * The darkish overlay that lays underneath the actual modal. Has a high
 * z-index so any clicks that hit outside of the modal content will hit this
 * background.
 */
const ModalOverlay: React.FC = () => {
  const lock: boolean = useReactiveVar(modalVar)?.lock;

  const onClick = (): void => {
    if (!lock) closeModal();
  };

  const css: string = cx('c-modal-bg', { 'c-modal-bg--lock': lock });

  return <div key="c-modal-bg" className={css} onClick={onClick} />;
};

export default ModalOverlay;
