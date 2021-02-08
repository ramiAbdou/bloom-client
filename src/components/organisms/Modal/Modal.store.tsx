import { action, createContextStore } from 'easy-peasy';

import { defaultModalOptions, ModalData, ModalModel } from './Modal.types';

const resetModalState: Partial<ModalModel> = {
  className: null,
  id: null,
  isShowing: false,
  metadata: null,
  onClose: null,
  options: null,
  width: null
};

const modalModel: ModalModel = {
  ...resetModalState,

  closeModal: action((state) => {
    return { ...state, ...resetModalState, isShowing: false };
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
