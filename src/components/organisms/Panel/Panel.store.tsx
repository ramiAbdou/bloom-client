import { action } from 'easy-peasy';

import {
  defaultPanelOptions,
  initialPanelModel,
  PanelData,
  PanelModel
} from './Panel.types';

const panelModel: PanelModel = {
  ...initialPanelModel,
  closePanel: action((state) => {
    return { ...state, ...initialPanelModel };
  }),
  id: null,
  isShowing: false,

  showPanel: action((state, args: PanelData) => {
    return {
      ...state,
      ...args,
      ...defaultPanelOptions[args.id],
      isShowing: true
    };
  })
};

export default panelModel;
