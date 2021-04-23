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
