/**
 * @fileoverview Store: Picker
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';

export type PickerAction = {
  separator?: boolean;
  onClick: VoidFunction; // Should perform some action.
  text: string;
};

export type PickerModel = {
  closePicker: Action<PickerModel>;
  id: string;
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

  isShowing: false,

  showPicker: action((state, id: string) => ({
    ...state,
    id,
    isShowing: true
  }))
};
