import { makeVar, ReactiveVar } from '@apollo/client';
import { ModalState } from './Modal.types';

export const modalVar: ReactiveVar<ModalState> = makeVar<ModalState>(null);

export const closeModal = (): void => {
  modalVar(null);
};

export const showModal = (state: ModalState): void => {
  modalVar(state);
};
