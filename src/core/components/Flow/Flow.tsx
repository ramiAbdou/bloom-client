/**
 * @fileoverview Component: Flow
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Flow.scss';

import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import Form from '@components/Form/Form.store';
import { useStoreActions, useStoreState } from '@store/Store';
import FlowContainer from './FlowContainer';
import FlowHeader from './FlowHeader';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const screens = useStoreState(({ flow }) => flow.screens);
  const closeFlow = useStoreActions(({ flow }) => flow.closeFlow);
  const isMobile = useStoreState(({ screen }) => screen.isMobile);

  // If it is desktop or tablet and click happens outside, close the flow.
  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => !isMobile && closeFlow());

  if (!screens.length) return null;

  // If there are any screens, display the current screen.
  const { node, header } = screens[currentScreen];

  return (
    <div ref={ref}>
      {header && <FlowHeader {...header} />}
      <div className="c-flow-content">{node}</div>
    </div>
  );
};

const FlowContent = () => {
  const screens = useStoreState(({ flow }) => flow.screens);
  if (!screens.length) return null;
  return <CurrentScreen />;
};

// -----------------------------------------------------------------------------

export default () => (
  <FlowContainer>
    <Form.Provider initialData={{ submitForm: () => {} }}>
      <FlowContent />
    </Form.Provider>
  </FlowContainer>
);
