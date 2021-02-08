import { Action } from 'easy-peasy';

import { ModalType } from '@constants';

export interface ModalOptions {
  confirmation?: boolean;
  lock?: boolean;
  sheet?: boolean;
}

export interface ModalData {
  className?: string;
  id: string;
  metadata?: any;
  onClose?: VoidFunction;
  options?: ModalOptions;
  width?: number;
}

export const defaultModalOptions: Record<string, Partial<ModalData>> = {
  [ModalType.ADD_MEMBERS]: { width: 750 },
  [ModalType.CREATE_EVENT]: {
    className: 'mo-create-event',
    options: { sheet: true }
  },
  [ModalType.DELETE_MEMBERS]: { options: { confirmation: true } },
  [ModalType.DEMOTE_MEMBERS]: { options: { confirmation: true } },
  [ModalType.INTEGRATIONS_DETAILS]: { className: 's-integrations-modal' },
  [ModalType.PROMOTE_MEMBERS]: { options: { confirmation: true } }
};

export interface ModalModel extends ModalData {
  closeModal: Action<ModalModel>;
  isShowing: boolean;
  showModal: Action<ModalModel, ModalData>;
}

export const initialModalModel: Partial<ModalModel> = {
  className: null,
  id: null,
  isShowing: false,
  metadata: null,
  onClose: null,
  options: null,
  width: null
};
