import { ChildrenProps, ClassNameProps, IdProps, StyleProps } from '@constants';

export interface ModalOptions {
  confirmation?: boolean;
  sheet?: boolean;
  width?: number;
}

export interface ModalProps
  extends ChildrenProps,
    ClassNameProps,
    IdProps,
    StyleProps {
  lock?: boolean;
  onClose?: VoidFunction;
  options?: ModalOptions;
}
