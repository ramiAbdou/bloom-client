import { Action } from 'easy-peasy';

import { ModalType } from '@constants';

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
  onClose?: VoidFunction;
  options?: ModalOptions;
  width?: number;
}

// ## MODAL TYPES

export const globalModals: ModalType[] = [
  ModalType.ADD_ADMINS,
  ModalType.ADD_MEMBERS,
  ModalType.APPLICANT,
  ModalType.CHANGE_MEMBERSHIP,
  ModalType.CHECK_IN,
  ModalType.CREATE_EVENT,
  ModalType.EDIT_MEMBERSHIP_INFORMATION,
  ModalType.EDIT_PERSONAL_INFORMATION,
  ModalType.EDIT_SOCIAL_MEDIA,
  ModalType.INTEGRATIONS_DETAILS,
  ModalType.MAILCHIMP_FLOW,
  ModalType.MEMBER_PROFILE,
  ModalType.PAY_DUES
];

export const localModals: ModalType[] = [
  ModalType.DELETE_MEMBERS,
  ModalType.DEMOTE_MEMBERS,
  ModalType.PROMOTE_MEMBERS
];

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
