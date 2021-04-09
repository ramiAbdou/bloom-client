import { Action } from 'easy-peasy';

import { UseMutationArgs } from '@gql/useBloomMutation';
import { IdProps } from '@util/constants';

export interface ToastOptions<S = any> extends Partial<IdProps> {
  message?: string;
  mutationArgsOnUndo?: UseMutationArgs<S>;
}

export type ToastModel = {
  dequeueToast: Action<ToastModel, string>;
  queue: ToastOptions[];
  showToast: Action<ToastModel, ToastOptions>;
};
