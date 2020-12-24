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
  locked?: boolean;
  onClose?: Function;
  width?: number;
}
