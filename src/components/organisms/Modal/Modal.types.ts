import { Action } from 'easy-peasy';

import { ModalType } from '@constants';
import { ADD_MEMBERS } from '@modals/AddMember/AddMember.gql';

export interface ModalOptions {
  confirmation?: boolean;
  lock?: boolean;
  sheet?: boolean;
}

export interface ModalData {
  id: string;
  metadata?: any;
  onClose?: VoidFunction;
  options?: ModalOptions;
  width?: number;
}

const modals: Record<string, ModalData> = {
  [ModalType.ADD_MEMBERS]: { id: ModalType.ADD_MEMBERS, width: 750 }
};

export interface ModalModel extends ModalData {
  closeModal: Action<ModalModel>;
  isShowing: boolean;
  showModal: Action<ModalModel, ModalData>;
}
