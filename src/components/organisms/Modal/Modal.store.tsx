import { action } from 'easy-peasy';

import { defaultModalOptions, ModalData, ModalModel } from './Modal.types';

const modalModel: ModalModel = {
  className: '',

  closeModal: action((state) => {
    return { ...state, id: null, isShowing: false, options: null };
  }),

  id: null,

  isShowing: false,

  metadata: null,

  onClose: null,

  options: null,

  showModal: action((state, args: ModalData) => {
    return {
      ...state,
      ...args,
      ...defaultModalOptions[args.id],
      isShowing: true
    };
  }),

  width: null
};

export default modalModel;
