import { Schema } from 'normalizr';

import { IdProps, MessageProps } from '@constants';

type UseMutationArgs<T, S> = {
  deleteArgs?: {
    ids: string[];
    refs?: {
      id: string;
      column: string;
      table: 'events' | 'guests' | 'members';
    }[];
    table: 'events' | 'guests' | 'members';
  };
  format?: (data: T) => any;
  name: string;
  query: string;
  schema?: Schema<any>;
  variables?: S;
};

export interface ToastOptions extends Partial<IdProps>, MessageProps {
  mutationArgsOnComplete?: UseMutationArgs<any, any>;
  mutationArgsOnUndo?: UseMutationArgs<any, any>;
  onUndo?: VoidFunction;
}
