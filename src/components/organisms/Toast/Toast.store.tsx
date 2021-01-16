import { Action, action } from 'easy-peasy';
import { UseClientRequestOptions } from 'graphql-hooks';

import { IdProps, MessageProps } from '@constants';
import { uuid } from '@util/util';

export interface ToastOptions extends Partial<IdProps>, MessageProps {
  mutationOptionsOnClose?: [string, UseClientRequestOptions<any>];
  onUndo?: VoidFunction;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
};

export const toastModel: ToastModel = {
  dequeueToast: action(({ queue }, id: string) => {
    const index = queue.findIndex(({ id: toastId }) => toastId === id);
    if (index < 0) return { queue };
    return { queue: [...queue.slice(0, index), ...queue.slice(index + 1)] };
  }),

  queue: [],

  showToast: action(({ queue }, toast) => ({
    queue: [...queue, { id: uuid(), ...toast }]
  }))
};
