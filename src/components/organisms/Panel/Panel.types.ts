import { PanelType } from '@util/constants';

// ## PANEL OPTIONS/DATA

export type PanelAction = {
  Icon?: React.FC;
  onClick: VoidFunction; // Should perform some action.
  text: string;
};

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
  uniqueIdentifier?: string;
}
