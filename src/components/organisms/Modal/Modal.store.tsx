import { action, createContextStore } from 'easy-peasy';

import {
  defaultModalOptions,
  initialModalModel,
  ModalData,
  ModalModel
} from './Modal.types';

const modalModel: ModalModel = {
  ...initialModalModel,

  closeModal: action((state) => {
    return { ...state, ...initialModalModel, isShowing: false };
  }),

  id: null,
  isShowing: false,

  showModal: action((state, args: ModalData) => {
    return {
      ...state,
      ...args,
      ...defaultModalOptions[args.id],
      isShowing: true
    };
  })
};

const ModalStore = createContextStore<ModalModel>(modalModel, {
  disableImmer: true
});

export default ModalStore;
