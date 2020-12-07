import { Action, action, Computed, computed } from 'easy-peasy';

export type PickerAction = {
  separator?: boolean;
  onClick: VoidFunction; // Should perform some action.
  text: string;
};

export type PickerAlign = 'RIGHT_BOTTOM' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';

export type PickerModel = {
  closePicker: Action<PickerModel>;
  id: string;
  isIdShowing: Computed<PickerModel, (id: string) => boolean, {}>;
  isShowing: boolean;
  showPicker: Action<PickerModel, string>;
};

export const pickerModel: PickerModel = {
  closePicker: action((state) => ({
    ...state,
    coordinates: null,
    id: '',
    isShowing: false
  })),

  id: '',

  isIdShowing: computed(({ id, isShowing }) => (PICKER_ID: string) =>
    isShowing && id === PICKER_ID
  ),

  isShowing: false,

  showPicker: action((state, id: string) => ({ ...state, id, isShowing: true }))
};
