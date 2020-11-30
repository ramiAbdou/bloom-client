/**
 * @fileoverview Store: Flow
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';
import { ReactNode } from 'react';

import { IdProps } from '@constants';

export interface ShowModalArgs extends IdProps {
  screens?: ReactNode[];
}

export type ModalModel = {
  closeModal: Action<ModalModel>;
  id: string; // Every modal must have unique identifier to help rendering.
  isShowing: boolean;
  screens: ReactNode[];
  showModal: Action<ModalModel, ShowModalArgs>;
};

export const modalModel: ModalModel = {
  closeModal: action((state) => ({
    ...state,
    id: '',
    isShowing: false
  })),

  id: '',

  isShowing: false,

  screens: [],

  showModal: action((state, modal: ShowModalArgs) => ({
    ...state,
    ...modal,
    isShowing: true
  }))
};
