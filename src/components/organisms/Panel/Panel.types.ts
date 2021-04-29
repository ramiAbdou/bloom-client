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

export enum PanelType {
  ADD_RECORDING_LINK = 'ADD_RECORDING_LINK',
  FILTER_DIRECTORY = 'FILTER_DIRECTORY',
  FILTER_TABLE = 'FILTER_TABLE',
  NAVIGATE_PROFILE = 'NAVIGATE_PROFILE',
  VIEW_TABLE_COLUMN = 'VIEW_TABLE_COLUMN'
}

export interface PanelState {
  id: PanelType;
  metadata?: unknown;
  scrollId?: string;
  uniqueIdentifier?: string;
}
