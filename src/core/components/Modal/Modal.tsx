/**
 * @fileoverview Component: Modal
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Modal.scss';

import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';

import {
  ChildrenProps,
  ClassNameProps,
  Function,
  IdProps,
  StyleProps
} from '@constants';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import ModalBackground from './ModalBackground';
import ModalContainer from './ModalContainer';

interface ModalProps
  extends IdProps,
    ChildrenProps,
    ClassNameProps,
    StyleProps {
  confirmation?: boolean;
  onClose?: Function;
  width?: number;
}

export default ({
  confirmation,
  children,
  className,
  id: MODAL_ID,
  onClose,
  width
}: ModalProps) => {
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const id = useStoreState(({ modal }) => modal.id);

  const shouldShowModal = useMemo(() => isShowing && MODAL_ID === id, [
    isShowing,
    id === MODAL_ID
  ]);

  const { css } = new CSSModifier()
    .class('c-modal-content')
    .addClass(confirmation, 'c-modal--confirmation')
    .addClass(!!className, className);

  return (
    <AnimatePresence>
      {shouldShowModal && (
        <>
          <ModalBackground />
          <ModalContainer width={width} onClose={onClose}>
            <div className={css}>{children}</div>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};
