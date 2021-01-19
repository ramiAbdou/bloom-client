import { ChildrenProps, ClassNameProps, IdProps, StyleProps } from '@constants';

export interface ModalProps
  extends ChildrenProps,
    ClassNameProps,
    IdProps,
    StyleProps {
  confirmation?: boolean;
  onClose?: VoidFunction;
  width?: number;
}
