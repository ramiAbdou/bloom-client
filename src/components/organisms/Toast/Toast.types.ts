import { Action } from 'easy-peasy';

import { IdProps } from '@constants';
import { UseMutationArgs } from '@hooks/useMutation.types';

export interface ToastOptions<T = any, S = any> extends Partial<IdProps> {
  message?: string;
  mutationArgsOnUndo?: UseMutationArgs<T, S>;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
};
