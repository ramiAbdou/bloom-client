/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { ReactNode } from 'react';

import { IdProps } from '@constants';
import { serializeFunc } from '@util/util';

export interface ShowModalArgs extends IdProps {
  onClose?: Function;
  screens?: ReactNode[];
}

export type ModalModel = {
  closeModal: Action<ModalModel, void | Function>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<ModalModel>;
  goForward: Action<ModalModel>;
  id: string;
  isShowing: boolean;
  onClose: string;
  screens: ReactNode[];
  setOnClose: Action<ModalModel, string>;
  showModal: Action<ModalModel, ShowModalArgs>;
};

export const modalModel: ModalModel = {
  closeModal: action((state, onClose?: Function) => {
    let updatedOnClose: string;

    if (onClose) updatedOnClose = serializeFunc(onClose);
    else if (state.onClose) updatedOnClose = state.onClose;
    else updatedOnClose = null;

    return {
      ...state,
      id: '',
      isShowing: false,
      onClose: updatedOnClose
    };
  }),

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

  onClose: null,

  screens: [],

  setOnClose: action((state, onClose: string) => ({ ...state, onClose })),

  showModal: action((state, { onClose, ...modal }: ShowModalArgs) => ({
    ...state,
    ...modal,
    isShowing: true,
    onClose: onClose ? serializeFunc(onClose) : null
  }))
};
