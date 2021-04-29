import { ModalType } from '@util/constants';

interface ModalOptions {
  className?: string;
  confirmation?: boolean;
  lock?: boolean;
  sheet?: boolean;
}

export interface ModalState {
  id: ModalType;
  metadata?: unknown;
  options?: ModalOptions;
  width?: number;
}
