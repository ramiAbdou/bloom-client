import { action } from 'easy-peasy';

import { ModalModel, ShowModalArgs } from './Modal.types';

const modalModel: ModalModel = {
  closeModal: action((state) => {
    return { ...state, id: null, isShowing: false, options: null };
  }),

  id: null,

  isShowing: false,

  metadata: null,

  options: null,

  showModal: action((state, args: ShowModalArgs) => {
    return { ...state, ...args, isShowing: true };
  })
};

export default modalModel;
