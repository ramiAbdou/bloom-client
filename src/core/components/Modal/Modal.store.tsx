/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { ReactNode } from 'react';

import { IdProps } from '@constants';

export interface ShowModalArgs extends IdProps {
  onClose?: VoidFunction;
  screens?: ReactNode[];
}

export type ModalModel = {
  closeModal: Action<ModalModel>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<ModalModel>;
  goForward: Action<ModalModel>;
  id: string;
  isShowing: boolean;
  onClose: VoidFunction;
  setOnClose: Action<ModalModel, VoidFunction>;
  screens: ReactNode[];
  showModal: Action<ModalModel, ShowModalArgs>;
};

export const modalModel: ModalModel = {
  closeModal: action((state) => ({
    ...state,
    id: '',
    isShowing: false
  })),

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

  onClose: () => {},

  screens: [],

  setOnClose: action((state, onClose: VoidFunction) => ({ ...state, onClose })),

  showModal: action((state, modal: ShowModalArgs) => ({
    ...state,
    ...modal,
    isShowing: true
  }))
};
