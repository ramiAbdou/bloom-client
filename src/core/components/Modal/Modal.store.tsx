/**
 * @fileoverview Store: Flow

 */

import { Action, action } from 'easy-peasy';

import { IdProps } from '@constants';

export type ShowModalArgs = IdProps;

export type ModalModel = {
  closeModal: Action<ModalModel>;
  id: string; // Every modal must have unique identifier to help rendering.
  isShowing: boolean;
  showModal: Action<ModalModel, string>;
};

export const modalModel: ModalModel = {
  closeModal: action((state) => ({
    ...state,
    id: '',
    isShowing: false
  })),

  id: '',

  isShowing: false,

  showModal: action((state, id: string) => ({ ...state, id, isShowing: true }))
};
