import { Action } from 'easy-peasy';

import { ModalType } from '@util/constants';

// ## MODAL OPTIONS/DATA

export interface ModalOptions {
  confirmation?: boolean;
  lock?: boolean;
  sheet?: boolean;
}

export interface ModalData {
  className?: string;
  id: ModalType;
  metadata?: any;
  options?: ModalOptions;
  width?: number;
}

// ## MODAL TYPES

export const defaultModalOptions: Record<string, Partial<ModalData>> = {
  [ModalType.ADD_MEMBERS]: { width: 750 },
  [ModalType.CREATE_EVENT]: {
    className: 'mo-create-event',
    options: { sheet: true }
  },
  [ModalType.INTEGRATIONS_DETAILS]: { className: 's-integrations-modal' }
};

export interface ModalModel extends ModalData {
  clearOptions: Action<ModalModel>;
  closeModal: Action<ModalModel>;
  isShowing: boolean;
  showModal: Action<ModalModel, ModalData>;
}

export const initialModalModel: Partial<ModalModel> = {
  className: null,
  id: null,
  isShowing: false,
  metadata: null,
  options: null,
  width: null
};
