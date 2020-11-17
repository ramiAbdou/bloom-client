/**
 * @fileoverview Component: Modal
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Modal.scss';

import { AnimatePresence } from 'framer-motion';
import React, { memo } from 'react';

import { ChildrenProps, IsShowingProps } from '@constants';
import { useStoreState } from '@store/Store';
import ModalContainer from './components/ModalContainer';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ modal }) => modal.currentScreen);
  const screens = useStoreState(({ modal }) => modal.screens);

  if (!screens?.length) return null;
  return <>{screens[currentScreen]}</>;
};

interface ModalProps extends IsShowingProps, Partial<ChildrenProps> {}

export default memo(({ children, isShowing }: ModalProps) => (
  <AnimatePresence>
    {isShowing && (
      <ModalContainer>
        <div className="c-modal-content">{children ?? <CurrentScreen />}</div>
      </ModalContainer>
    )}
  </AnimatePresence>
));
