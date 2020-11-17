/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { ReactNode } from 'react';

import { IdProps } from '@constants';

export type ModalType = 'CONFIRMATION' | 'CUSTOM';

// ## TYPE 1: CONFIRMATION MODAL

export type ConfirmationModalOptions = {
  body?: ReactNode;
  description?: string;
  header?: ReactNode;
  primaryButton: ReactNode;
  outlineButton: ReactNode;
  title?: string;
};

export interface ConfirmationModal extends IdProps {
  options: ConfirmationModalOptions;
  type: ModalType;
}

// ## TYPE 2: CUSTOM MODAL
// - This is where we can define different screens that the the user will have
// to navigate through.

export type CustomModalScreen = { node: ReactNode };

export interface CustomModal extends IdProps {
  screens: CustomModalScreen[];
  type: ModalType;
}

export type ShowModalArgs = ConfirmationModal | CustomModal;

export type ModalModel = {
  closeModal: Action<ModalModel>;
  currentScreen: number; // Index of the current screen;
  goBack: Action<ModalModel>;
  goForward: Action<ModalModel>;
  id: string;
  isShowing: boolean;
  options: ConfirmationModalOptions;
  screens: CustomModalScreen[];
  showModal: Action<ModalModel, ShowModalArgs>;
  type: ModalType;
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

  options: null,

  screens: [],

  showModal: action((state, modal: ShowModalArgs) => ({
    ...state,
    ...modal,
    isShowing: true
  })),

  type: 'CONFIRMATION'
};
