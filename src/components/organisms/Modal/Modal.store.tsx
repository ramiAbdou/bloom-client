import { action } from 'easy-peasy';

import { ModalData, ModalModel } from './Modal.types';

const modalModel: ModalModel = {
  closeModal: action((state) => {
    return { ...state, id: null, isShowing: false, options: null };
  }),

  id: null,

  isShowing: false,

  metadata: null,

  onClose: null,

  options: null,

  showModal: action((state, args: ModalData) => {
    return { ...state, ...args, isShowing: true };
  }),

  width: null
};

export default modalModel;
