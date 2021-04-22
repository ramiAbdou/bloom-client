import { makeVar, ReactiveVar } from '@apollo/client';
import { ModalType } from '@util/constants';

interface ModalOptions {
  className?: string;
  confirmation?: boolean;
  lock?: boolean;
  sheet?: boolean;
}

interface ModalData {
  id: ModalType;
  metadata?: unknown;
  options?: ModalOptions;
}

export const modalVar: ReactiveVar<ModalData> = makeVar<ModalData>(null);

// export const modalOptions: Record<ModalType, ModalData> = {

// };
