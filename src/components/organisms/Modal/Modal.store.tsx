import { action, State } from 'easy-peasy';

import {
  defaultModalOptions,
  initialModalModel,
  ModalData,
  ModalModel
} from './Modal.types';

const modalStateModel: State<ModalModel> = {
  ...initialModalModel,
  id: null,
  isShowing: false
};

const modalModel: ModalModel = {
  ...modalStateModel,

  clearOptions: action((state) => {
    return { ...state, ...initialModalModel };
  }),

  closeModal: action((state) => {
    return { ...state, isShowing: false };
  }),

  showModal: action((state, args: ModalData) => {
    const defaultOptions = defaultModalOptions[args.id];

    return {
      ...state,
      ...args,
      ...defaultOptions,
      isShowing: true,
      options: { ...defaultOptions?.options, ...args.options }
    };
  })
};

export default modalModel;
