import { ClassNameProps, IdProps, StyleProps } from '@constants';

export interface ModalOptions {
  confirmation?: boolean;
  sheet?: boolean;
  width?: number;
}

export interface ModalProps extends ClassNameProps, IdProps, StyleProps {
  lock?: boolean;
  onClose?: VoidFunction;
  options?: ModalOptions;
}
