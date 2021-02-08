import { Action } from 'easy-peasy';

import { BaseProps, IdProps } from '@constants';

export interface ModalOptions {
  confirmation?: boolean;
  sheet?: boolean;
  width?: number;
}

export interface ModalProps extends BaseProps, IdProps {
  lock?: boolean;
  onClose?: VoidFunction;
  options?: ModalOptions;
}

export interface ShowModalArgs {
  id: string;
  metadata?: any;
  options?: ModalOptions;
}

export interface ModalModel {
  closeModal: Action<ModalModel>;
  id: string; // Every modal must have unique identifier to help rendering.
  isShowing: boolean;
  metadata?: any;
  options?: ModalOptions;
  showModal: Action<ModalModel, ShowModalArgs>;
}
