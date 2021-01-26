import { UseClientRequestOptions } from 'graphql-hooks';

import { IdProps, MessageProps } from '@constants';

export interface ToastOptions extends Partial<IdProps>, MessageProps {
  mutationOptionsOnClose?: [string, UseClientRequestOptions<any>];
  onUndo?: VoidFunction;
}
