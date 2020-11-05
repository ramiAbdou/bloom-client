/**
 * @fileoverview Store: Picker
 * @author Rami Abdou
 */

import { Action, action, Thunk, thunk } from 'easy-peasy';

export type PickerAction = {
  onClick: VoidFunction; // Should perform some action.
  text: string;
};

// This is needed for the absolute positioning. If alignRight is true, then
// coordinates.left should be null. If it is false, coordinates.right should be
// null. Top should always have a value if either left or right is populated.
type PickerCoordinates = { left?: number; right?: number; top?: number };

type PickerOptions = {
  actions: PickerAction[];
  alignRight?: boolean;
  id: string;
  isFixed?: boolean;
};

export type PickerModel = {
  actions: PickerAction[];
  alignRight: boolean;
  closePicker: Action<PickerModel>;
  coordinates: PickerCoordinates;
  id: string;
  init: Action<PickerModel, PickerOptions>;
  isFixed: boolean;
  isShowing: boolean;
  setCoordinates: Action<PickerModel>;
  showPicker: Thunk<PickerModel, PickerOptions>;
};

export const pickerModel: PickerModel = {
  actions: [],

  alignRight: false,

  closePicker: action((state) => ({
    ...state,
    actions: [],
    alignRight: false,
    coordinates: null,
    id: '',
    isFixed: false,
    isShowing: false
  })),

  coordinates: null,

  id: '',

  init: action(
    (state, { actions, alignRight, isFixed, id }: PickerOptions) => ({
      ...state,
      actions,
      alignRight,
      id,
      isFixed,
      isShowing: true
    })
  ),

  isFixed: false,

  isShowing: false,

  setCoordinates: action((state) => {
    const { alignRight, coordinates, id } = state;

    // The screen should already be loaded and there should be an ID stored.
    const { innerWidth: windowWidth } = window;
    if (!id || !windowWidth) return state;

    // Also, if the element doesn't exist (though it should), don't update.
    const element: HTMLElement = document.getElementById(id);
    if (!element) return state;

    const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = element;

    const updatedLeft = offsetLeft;
    const updatedRight = windowWidth - (offsetLeft + offsetWidth);
    const updatedTop = offsetTop + offsetHeight + 10; // + 10 for extra margin.

    // If there was previously no coordinates, set the coordindates accordingly.
    if (!coordinates)
      return {
        ...state,
        coordinates: {
          left: alignRight ? null : updatedLeft,
          right: alignRight ? updatedRight : null,
          top: updatedTop
        }
      };

    const { left, right, top } = coordinates;

    // If the coordinates are the same as previously, don't update.
    if (alignRight && right === updatedRight && top === updatedTop)
      return state;
    if (!alignRight && left === updatedLeft && top === updatedTop) return state;

    // Otherwise, update the coordinates.
    if (alignRight)
      return {
        ...state,
        coordinates: { left: null, right: updatedRight, top: updatedTop }
      };

    return {
      ...state,
      coordinates: { left: updatedLeft, right: null, top: updatedTop }
    };
  }),

  showPicker: thunk(({ init, setCoordinates }, options: PickerOptions) => {
    console.log('SHOW');
    init(options);
    setCoordinates();
  })
};
