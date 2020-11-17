/**
 * @fileoverview Component: Flow
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Flow.scss';

import { AnimatePresence } from 'framer-motion';
import React, { memo } from 'react';

import { IsShowingProps } from '@constants';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import FlowContainer from './FlowContainer';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const screens = useStoreState(({ flow }) => flow.screens);
  if (!screens.length) return null;

  // If there are any screens, display the current screen.
  const { node } = screens[currentScreen];
  const { css } = new CSSModifier().class('c-flow-content');

  return (
    <div className="c-flow-ctr">
      <div className={css}>{node}</div>
    </div>
  );
};

// -----------------------------------------------------------------------------

export default memo(({ isShowing }: IsShowingProps) => (
  <AnimatePresence>
    {isShowing && (
      <FlowContainer>
        <CurrentScreen />
      </FlowContainer>
    )}
  </AnimatePresence>
));
