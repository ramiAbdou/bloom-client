import { Action } from 'easy-peasy';

import { UseMutationArgs } from '@hooks/useMutation.types';
import { IdProps } from '@util/constants';

export interface ToastOptions<S = unknown> extends Partial<IdProps> {
  message?: string;
  mutationArgsOnUndo?: UseMutationArgs<S>;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
};
