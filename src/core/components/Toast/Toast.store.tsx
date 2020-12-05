import { Action, action } from 'easy-peasy';
import { UseClientRequestOptions } from 'graphql-hooks';

import { IdProps, MessageProps } from '@constants';
import { uuid } from '@util/util';

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
    if (index >= 0) queue.splice(index, 1);
    return { queue };
  }),

  queue: [],

  showToast: action(({ queue }, toast) => ({
    queue: [...queue, { id: `${toast.message}-${uuid()}`, ...toast }]
  }))
};
