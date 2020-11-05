/**
 * @fileoverview Store: Picker
 * @author Rami Abdou
 */

import { Action, action, Thunk, thunk } from 'easy-peasy';

export type PickerAction = {
  separator?: boolean;
  onClick: VoidFunction; // Should perform some action.
  text: string;
};

// This is needed for the absolute positioning. If alignRight is true, then
// coordinates.left should be null. If it is false, coordinates.right should be
// null. Top should always have a value if either left or right is populated.
type PickerCoordinates = { left?: number; right?: number; top?: number };
type PickerOffset = { marginLeft?: number; marginTop?: number };

type PickerOptions = {
  actions: PickerAction[];
  align: 1 | 2 | 3 | 4;
  id: string;
  isFixed?: boolean;
  offset?: PickerOffset;
};

export type PickerModel = {
  actions: PickerAction[];
  align: 1 | 2 | 3 | 4;
  closePicker: Action<PickerModel>;
  coordinates: PickerCoordinates;
  id: string;
  init: Action<PickerModel, PickerOptions>;
  isFixed: boolean;
  isShowing: boolean;
  offset?: PickerOffset;
  setCoordinates: Action<PickerModel>;
  showPicker: Thunk<PickerModel, PickerOptions>;
};

export const pickerModel: PickerModel = {
  actions: [],

  align: 1,

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
    (state, { actions, align, isFixed, id, offset }: PickerOptions) => ({
      ...state,
      actions,
      align,
      id,
      isFixed,
      isShowing: true,
      offset
    })
  ),

  isFixed: false,

  isShowing: false,

  offset: null,

  setCoordinates: action((state) => {
    const { align, coordinates, id } = state;

    // The screen should already be loaded and there should be an ID stored.
    // Also, if the element doesn't exist (though it should), don't update.
    const { innerWidth: windowWidth } = window;
    const element: HTMLElement = document.getElementById(id);

    if (!id || !windowWidth || !element) return state;

    const { offsetLeft, offsetTop, offsetWidth } = element;
    const updatedLeft = offsetLeft;
    const updatedRight = offsetLeft + offsetWidth;

    if (align === 4)
      return {
        ...state,
        coordinates: { left: updatedRight, top: offsetTop }
      };

    // If there was previously no coordinates, set the coordindates accordingly.
    if (!coordinates)
      return {
        ...state,
        coordinates: {
          left: align ? null : updatedLeft,
          right: align ? updatedRight : null,
          top: offsetTop
        }
      };

    const { left, right, top } = coordinates;

    // If the coordinates are the same as previously, don't update.
    if (align && right === updatedRight && top === offsetTop) return state;
    if (!align && left === updatedLeft && top === offsetTop) return state;

    // Otherwise, update the coordinates.
    if (align)
      return {
        ...state,
        coordinates: { left: null, right: updatedRight, top: offsetTop }
      };

    return {
      ...state,
      coordinates: { left: updatedLeft, right: null, top: offsetTop }
    };
  }),

  showPicker: thunk(({ init, setCoordinates }, options: PickerOptions) => {
    init(options);
    setCoordinates();
  })
};
