import { Action, action, Computed, computed } from 'easy-peasy';

export type PanelModel = {
  closePanel: Action<PanelModel>;
  id: string;
  isIdShowing: Computed<PanelModel, (id: string) => boolean, {}>;
  isShowing: boolean;
  showPicker: Action<PanelModel, string>;
};

export const panelModel: PanelModel = {
  closePanel: action((state) => ({ ...state, id: '', isShowing: false })),

  id: '',

  isIdShowing: computed(({ id, isShowing }) => (PICKER_ID: string) =>
    isShowing && id === PICKER_ID
  ),

  isShowing: false,

  showPicker: action((state, id: string) => ({ ...state, id, isShowing: true }))
};
