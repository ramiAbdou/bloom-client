import { makeVar, ReactiveVar } from '@apollo/client';
import { PanelType } from '@util/constants';

export type PanelAlign =
  | 'RIGHT_BOTTOM'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'TOP_LEFT';

export interface PanelState {
  align?: PanelAlign;
  className: string;
  id: PanelType;
  metadata?: unknown;
  scrollId?: string;
  size?: 'md' | 'lg';
  useMetadataInId?: boolean;
}

export const panelVar: ReactiveVar<PanelState> = makeVar<PanelState>(null);

/**
 * Closes the panel by setting the panelVar to null.
 */
export const closePanel = (): void => {};

/**
 * Shows the panel with the given PanelData.
 */
export const showPanel = (): void => {};
