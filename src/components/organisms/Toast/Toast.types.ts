import { Schema } from 'normalizr';

import { IdProps, MessageProps } from '@constants';

type UseMutationArgs<T, S> = {
  format?: (data: T) => any;
  name: string;
  query: string;
  schema?: Schema<any>;
  variables?: S;
};

export interface ToastOptions extends Partial<IdProps>, MessageProps {
  mutationArgs?: UseMutationArgs<any, any>;
  onUndo?: VoidFunction;
}
