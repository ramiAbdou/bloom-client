/**
 * @fileoverview Store: Toast
 * @author Rami Abdou
 */

import { Action, action, Thunk, thunk } from 'easy-peasy';

import { IdProps, MessageProps } from '@constants';

type ToastType = 'STANDARD' | 'PESSIMISTIC' | 'ERROR';
export interface ToastOptions extends IdProps, MessageProps {
  type?: ToastType;
}

interface ShowToastArgs extends MessageProps {
  type?: ToastType;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  enqueueToast: Action<ToastModel, ToastOptions>;
  queue: ToastOptions[];
  showToast: Thunk<ToastModel, ShowToastArgs>;
};

export const toastModel: ToastModel = {
  dequeueToast: action(({ queue }, id: string) => {
    const index = queue.findIndex(({ id: toastId }) => toastId === id);
    return {
      queue:
        index === -1
          ? queue
          : [...queue.slice(0, index), ...queue.slice(index + 1)]
    };
  }),

  enqueueToast: action(({ queue }, toast) => ({ queue: [...queue, toast] })),

  queue: [],

  showToast: thunk(({ dequeueToast, enqueueToast }, toast) => {
    const id = `${toast.message}-${Math.random()}`;
    enqueueToast({ id, ...toast });
    setTimeout(() => dequeueToast(id), 5000);
  })
};
