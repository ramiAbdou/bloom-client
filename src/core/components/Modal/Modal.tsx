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

import { ChildrenProps, ClassNameProps, IdProps } from '@constants';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import ModalContainer from './ModalContainer';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ modal }) => modal.currentScreen);
  const screens = useStoreState(({ modal }) => modal.screens);
  return screens.length ? <>{screens[currentScreen]}</> : null;
};

interface ModalProps extends IdProps, Partial<ChildrenProps>, ClassNameProps {
  confirmation?: boolean;
}

export default ({
  confirmation,
  children,
  className,
  id: MODAL_ID
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
        <ModalContainer>
          <div className={css}>{children ?? <CurrentScreen />}</div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};
