/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import Flow from '@components/Flow/Flow';
import { FlowScreen } from '@store/Flow.store';
import { useStoreActions, useStoreState } from '@store/Store';

export default () => {
  const FLOW_ID = 'MAILCHIMP-FLOW';

  const id = useStoreState(({ flow }) => flow.id);
  const isShowing = useStoreState(({ flow }) => flow.isShowing);
  const showFlow = useStoreActions(({ flow }) => flow.showFlow);

  useEffect(() => {
    const screens: FlowScreen[] = [{ node: <h1>Integrate with Mailchimp</h1> }];
    showFlow({ id: FLOW_ID, screens });
  }, []);

  const shouldShowFlow = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return <Flow isShowing={shouldShowFlow} />;
};
