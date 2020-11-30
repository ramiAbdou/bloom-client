/**
 * @fileoverview Component: Modal
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Modal.scss';

import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo } from 'react';

import {
  ChildrenProps,
  ClassNameProps,
  Function,
  IdProps,
  StyleProps
} from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import { serializeFunc } from '@util/util';
import ModalContainer from './ModalContainer';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ modal }) => modal.currentScreen);
  const screens = useStoreState(({ modal }) => modal.screens);
  return screens.length ? <>{screens[currentScreen]}</> : null;
};

interface ModalProps
  extends IdProps,
    Partial<ChildrenProps>,
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
  const onCloseState = useStoreState(({ modal }) => modal.onClose);
  const setOnClose = useStoreActions(({ modal }) => modal.setOnClose);

  const serializedOnClose = serializeFunc(onClose);

  const shouldShowModal = useMemo(() => isShowing && MODAL_ID === id, [
    isShowing,
    id === MODAL_ID
  ]);

  useEffect(() => {
    if (shouldShowModal && serializedOnClose) {
      console.log(serializedOnClose);
      setOnClose(serializedOnClose);
    }
    // else if (!shouldShowModal && onCloseState) setOnClose(null);
  }, [serializedOnClose, shouldShowModal]);

  const { css } = new CSSModifier()
    .class('c-modal-content')
    .addClass(confirmation, 'c-modal--confirmation')
    .addClass(!!className, className);

  return (
    <AnimatePresence>
      {shouldShowModal && (
        <ModalContainer width={width}>
          <div className={css}>{children ?? <CurrentScreen />}</div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};
