import { Action, action } from 'easy-peasy';
import { UseClientRequestOptions } from 'graphql-hooks';

import { IdProps, MessageProps } from '@constants';

type ToastType = 'STANDARD' | 'PESSIMISTIC' | 'ERROR';

export interface ToastOptions extends Partial<IdProps>, MessageProps {
  mutationOptionsOnClose?: [string, UseClientRequestOptions<any>];
  onUndo?: Function;
  type?: ToastType;
  undo?: boolean;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
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

  queue: [],

  showToast: action(({ queue }, toast) => ({
    queue: [...queue, { id: `${toast.message}-${Math.random()}`, ...toast }]
  }))
};
