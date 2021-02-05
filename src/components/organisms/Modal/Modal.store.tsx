import { Action, action } from 'easy-peasy';

export type ModalModel = {
  closeModal: Action<ModalModel>;
  id: string; // Every modal must have unique identifier to help rendering.
  isShowing: boolean;
  showModal: Action<ModalModel, string>;
};

export const modalModel: ModalModel = {
  closeModal: action((state) => {
    return { ...state, id: null, isShowing: false };
  }),

  id: null,

  isShowing: false,

  showModal: action((state, id: string) => {
    return { ...state, id, isShowing: true };
  })
};
