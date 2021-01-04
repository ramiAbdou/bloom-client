import {
  ChildrenProps,
  ClassNameProps,
  Function,
  IdProps,
  StyleProps
} from '@constants';

export interface ModalProps
  extends ChildrenProps,
    ClassNameProps,
    IdProps,
    StyleProps {
  confirmation?: boolean;
  onClose?: Function;
  width?: number;
}
