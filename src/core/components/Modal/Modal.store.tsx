/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { ReactNode } from 'react';

import { Function, IdProps } from '@constants';

export interface ShowModalArgs extends IdProps {
  onClose?: VoidFunction;
  screens?: ReactNode[];
}

export type ModalModel = {
  closeModal: Action<ModalModel, void | Function>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<ModalModel>;
  goForward: Action<ModalModel>;
  id: string;
  isShowing: boolean;
  onClose: VoidFunction;
  screens: ReactNode[];
  showModal: Action<ModalModel, ShowModalArgs>;
};

export const modalModel: ModalModel = {
  closeModal: action((state, onClose?: Function) => ({
    ...state,
    id: '',
    isShowing: false,
    onClose: onClose ?? (() => {})
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

  showModal: action((state, modal: ShowModalArgs) => ({
    ...state,
    ...modal,
    isShowing: true
  }))
};
