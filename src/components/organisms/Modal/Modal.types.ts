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
