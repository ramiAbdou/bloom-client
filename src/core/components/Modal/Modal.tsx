/**
 * @fileoverview Component: Modal
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Modal.scss';

import { AnimatePresence } from 'framer-motion';
import React, { memo, ReactNode } from 'react';

import { IsShowingProps } from '@constants';
import { useStoreState } from '@store/Store';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import CurrentScreen from './components/CustomModal/CurrentScreen';
import ModalContainer from './components/ModalContainer';

const Content = () => {
  const type = useStoreState(({ modal }) => modal.type);
  let body: ReactNode = null;

  if (type === 'CONFIRMATION') body = <ConfirmationModal />;
  if (type === 'CUSTOM') body = <CurrentScreen />;

  return <div className="c-modal-content">{body}</div>;
};

export default memo(({ isShowing }: IsShowingProps) => (
  <AnimatePresence>
    {isShowing && (
      <ModalContainer>
        <Content />
      </ModalContainer>
    )}
  </AnimatePresence>
));
