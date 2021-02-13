import { action } from 'easy-peasy';
import { nanoid } from 'nanoid';

import { ToastModel } from './Toast.types';

const toastModel: ToastModel = {
  dequeueToast: action(({ queue }, id: string) => {
    const index = queue.findIndex(({ id: toastId }) => toastId === id);
    if (index < 0) return { queue };
    return { queue: [...queue.slice(0, index), ...queue.slice(index + 1)] };
  }),

  queue: [],

  showToast: action(({ queue }, toast) => ({
    queue: [...queue, { id: nanoid(), ...toast }]
  }))
};

export default toastModel;
