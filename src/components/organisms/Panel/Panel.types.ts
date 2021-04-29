import { BaseProps, PanelType } from '@util/constants';

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
  useMetadataInId?: boolean;
}

// ## PANEL MODEL

export type PanelModel = PanelData;

export const initialPanelModel: Partial<PanelModel> = {
  align: null,
  className: null,
  id: null,
  metadata: null,
  scrollId: null,
  style: null,
  useMetadataInId: false
};
