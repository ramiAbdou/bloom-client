/**
 * @fileoverview Store: Toast
 * @author Rami Abdou
 */

import { Action, action, Thunk, thunk } from 'easy-peasy';

import { MessageProps } from '@constants';

export const ANIMATION_DURATION = 500;
export interface ToastOptions extends MessageProps {
  id: number;
  isError?: boolean;
}

interface ShowToastArgs extends MessageProps {
  isError?: boolean;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel>;
  enqueueToast: Action<ToastModel, ToastOptions>;
  queue: ToastOptions[];
  showToast: Thunk<ToastModel, ShowToastArgs>;
};

export const toastModel: ToastModel = {
  dequeueToast: action(({ queue: [, ...end] }) => ({ queue: end })),
  enqueueToast: action(({ queue }, toast) => ({ queue: [...queue, toast] })),
  queue: [],
  showToast: thunk((actions, toast) => {
    actions.enqueueToast({ ...toast, id: Math.random() });
    setTimeout(actions.dequeueToast, 3000 + ANIMATION_DURATION);
  })
};
