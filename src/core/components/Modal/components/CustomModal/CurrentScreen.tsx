/**
 * @fileoverview Component: CurrentScreen
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

export default () => {
  const currentScreen = useStoreState(({ modal }) => modal.currentScreen);
  const screens = useStoreState(({ modal }) => modal.screens);

  if (!screens?.length) return null;
  return <>{screens[currentScreen]?.node}</>;
};
