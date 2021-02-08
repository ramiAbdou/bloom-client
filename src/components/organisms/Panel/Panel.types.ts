import { Action } from 'easy-peasy';

import { BaseProps, PanelType } from '@constants';

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

export interface PanelData extends BaseProps {
  align?: PanelAlign;
  id: PanelType;
  metadata?: any;
  scrollId?: string;
  size?: 'md' | 'lg';
}

// ## PANEL TYPES

export const globalPanels: PanelType[] = [
  PanelType.ADD_RECORDING_LINK,
  PanelType.PROFILE
];

export const localPanels: PanelType[] = [PanelType.TABLE_FILTER];

export const defaultPanelOptions: Record<string, Partial<PanelData>> = {
  [PanelType.ADD_RECORDING_LINK]: { align: 'BOTTOM_LEFT', size: 'lg' },
  [PanelType.PROFILE]: {
    align: 'RIGHT_BOTTOM',
    style: { marginLeft: 24, minWidth: 270, padding: 8 }
  },
  [PanelType.TABLE_FILTER]: { align: 'BOTTOM_RIGHT' }
};

// ## PANEL MODEL

export interface PanelModel extends PanelData {
  closePanel: Action<PanelModel>;
  isShowing: boolean;
  showPanel: Action<PanelModel, PanelData>;
}

export const initialPanelModel: Partial<PanelModel> = {
  align: null,
  className: null,
  id: null,
  isShowing: false,
  metadata: null,
  scrollId: null,
  style: null
};
