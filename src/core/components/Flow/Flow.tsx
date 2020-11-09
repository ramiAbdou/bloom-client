/**
 * @fileoverview Component: Flow
 * - Represents a user flow in which they use multiple screens to execute
 * something. Example: When a user wants to edit a prompt answer, a Flow
 * would open with multiple screens.
 * @author Rami Abdou
 */

import './Flow.scss';

import React from 'react';

import Form from '@components/Form/Form.store';
import { useStoreState } from '@store/Store';
import FlowContainer from './FlowContainer';
import FlowHeader from './FlowHeader';

const CurrentScreen = () => {
  const currentScreen = useStoreState(({ flow }) => flow.currentScreen);
  const screens = useStoreState(({ flow }) => flow.screens);
  if (!screens.length) return null;

  // If there are any screens, display the current screen.
  const { node, header } = screens[currentScreen];

  return (
    <div className="c-flow-ctr">
      {header && <FlowHeader {...header} />}
      <div className="c-flow-content">{node}</div>
    </div>
  );
};

// -----------------------------------------------------------------------------

export default () => {
  const screens = useStoreState(({ flow }) => flow.screens);
  if (!screens.length) return null;

  return (
    <FlowContainer>
      <Form.Provider initialData={{}}>
        <CurrentScreen />
      </Form.Provider>
    </FlowContainer>
  );
};
