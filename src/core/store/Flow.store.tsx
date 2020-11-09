/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';

type FlowScreenHeader = {
  buttonText: string;
  onNextClick?: VoidFunction;
  onPreviousClick?: VoidFunction;
  title: string;
};

export type FlowScreen = { node: React.ReactNode; header: FlowScreenHeader };
export type ShowFlowArgs = { flowScreens: FlowScreen[] };

export type FlowModel = {
  closeFlow: Action<FlowModel>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<FlowModel>;
  goForward: Action<FlowModel>;
  isShowing: boolean;
  screens: FlowScreen[];
  showFlow: Action<FlowModel, FlowScreen[]>;
};

export const flowModel: FlowModel = {
  closeFlow: action((state) => ({ ...state, isShowing: false })),

  currentScreen: 0,

  goBack: action((state) => ({
    ...state,
    currentScreen: --state.currentScreen
  })),

  goForward: action((state) => ({
    ...state,
    currentScreen: ++state.currentScreen
  })),

  isShowing: false,

  screens: [],

  showFlow: action((state, screens) => ({ ...state, screens }))
};
