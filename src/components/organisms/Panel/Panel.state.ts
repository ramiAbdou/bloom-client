import { makeVar, ReactiveVar } from '@apollo/client';
import { PanelState } from './Panel.types';

export const panelVar: ReactiveVar<PanelState> = makeVar<PanelState>(null);

/**
 * Closes the panel by setting the panelVar to null.
 */
export const closePanel = (): void => {
  panelVar(null);
};

/**
 * Shows the panel with the given PanelState.
 */
export const showPanel = (updatedState: PanelState): void => {
  panelVar(updatedState);
};
