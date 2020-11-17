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

export type FlowScreen = {
  node?: React.ReactNode;
  header?: FlowScreenHeader;
  separator?: boolean;
};
export type ShowFlowArgs = { id: string; screens: FlowScreen[] };

export type FlowModel = {
  closeFlow: Action<FlowModel>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<FlowModel>;
  goForward: Action<FlowModel>;
  id: string;
  isShowing: boolean;
  screens: FlowScreen[];
  showFlow: Action<FlowModel, ShowFlowArgs>;
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

  id: '',

  isShowing: false,

  screens: [],

  showFlow: action((state, { id, screens }: ShowFlowArgs) => ({
    ...state,
    id,
    isShowing: true,
    screens
  }))
};
