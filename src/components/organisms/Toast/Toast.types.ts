import { Action } from 'easy-peasy';

import { IdProps } from '@util/constants';

export interface ToastOptions extends Partial<IdProps> {
  message?: string;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
};
