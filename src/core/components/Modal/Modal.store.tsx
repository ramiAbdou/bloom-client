/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';

export type ModalScreen = {
  node?: React.ReactNode;
  separator?: boolean;
};
export type ShowFlowArgs = { id: string; screens: ModalScreen[] };

export type ModalModel = {
  closeModal: Action<ModalModel>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<ModalModel>;
  goForward: Action<ModalModel>;
  id: string;
  isShowing: boolean;
  screens: ModalScreen[];
  showModal: Action<ModalModel, ShowFlowArgs>;
};

export const modalModel: ModalModel = {
  closeModal: action((state) => ({ ...state, isShowing: false })),

  currentScreen: 0,

  goBack: action((state) => ({
    ...state,
    currentScreen: --state.currentScreen
  })),

  goForward: action((state) => ({
    ...state,
    currentScreen: ++state.currentScreen
  })),

  id: '',

  isShowing: false,

  screens: [],

  showModal: action((state, { id, screens }: ShowFlowArgs) => ({
    ...state,
    id,
    isShowing: true,
    screens
  }))
};
