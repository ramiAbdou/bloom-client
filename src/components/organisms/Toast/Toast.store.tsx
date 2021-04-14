import { action } from 'easy-peasy';
import { nanoid } from 'nanoid';

import { ToastModel, ToastOptions } from './Toast.types';

const toastModel: ToastModel = {
  dequeueToast: action(({ queue }, toastId: string) => {
    const index: number = queue.findIndex(
      (toast: ToastOptions) => toast.id === toastId
    );

    return {
      queue:
        index < 0
          ? queue
          : [...queue.slice(0, index), ...queue.slice(index + 1)]
    };
  }),

  queue: [],

  showToast: action(({ queue }, toast: ToastOptions) => {
    return {
      queue: [...queue, { ...toast, id: nanoid() }]
    };
  })
};

export default toastModel;
