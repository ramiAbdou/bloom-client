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

import Form from '@components/Form/Form.store';
import { IsShowingProps } from '@constants';
import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import FlowContainer from './FlowContainer';
import FlowHeader from './FlowHeader';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const screens = useStoreState(({ flow }) => flow.screens);
  if (!screens.length) return null;

  // If there are any screens, display the current screen.
  const { node, header } = screens[currentScreen];
  const { css } = new CSSModifier()
    .class('c-flow-content')
    .addClass(!header, 'c-flow-content--custom');

  return (
    <div className="c-flow-ctr">
      {header && <FlowHeader {...header} />}
      <div className={css}>{node}</div>
    </div>
  );
};

// -----------------------------------------------------------------------------

export default memo(({ isShowing }: IsShowingProps) => (
  <AnimatePresence>
    {isShowing && (
      <FlowContainer>
        <Form.Provider initialData={{}}>
          <CurrentScreen />
        </Form.Provider>
      </FlowContainer>
    )}
  </AnimatePresence>
));
