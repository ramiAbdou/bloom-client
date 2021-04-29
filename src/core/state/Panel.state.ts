import { makeVar, ReactiveVar } from '@apollo/client';
import { PanelType } from '@util/constants';

export type PanelAlign =
  | 'RIGHT_BOTTOM'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'TOP_LEFT';

export interface PanelState {
  align?: PanelAlign;
  className?: string;
  id: PanelType;
  metadata?: unknown;
  scrollId?: string;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
  useMetadataInId?: boolean;
}

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
