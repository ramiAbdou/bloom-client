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
type PickerOffset = {
  marginBottom?: number;
  marginLeft?: number;
  marginTop?: number;
};

type PickerCoordinates = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
};

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
    const { innerHeight, innerWidth } = window;
    const element: HTMLElement = document.getElementById(id);

    if (!id || !innerWidth || !element) return state;

    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = element;
    const { bottom, left } = coordinates ?? {};

    // CASE: align === 4
    // Left is going to be the element's left + element width. Bottom is going
    // to be the element's bottom

    if (align === 4) {
      const leftWithWidth = offsetLeft + offsetWidth;
      const updatedBottom = innerHeight - (offsetTop + offsetHeight);

      // If the coordinates haven't changed, then just return the normal state.
      return coordinates && bottom === updatedBottom && left === leftWithWidth
        ? state
        : {
            ...state,
            coordinates: { bottom: updatedBottom, left: leftWithWidth }
          };
    }

    /**
     * @todo All of the other align cases: 1, 2, 3.
     */

    return state;
  }),

  showPicker: thunk(({ init, setCoordinates }, options: PickerOptions) => {
    init(options);
    setCoordinates();
  })
};
