import { IdProps, MessageProps } from '@constants';
import { UseMutationArgs } from '@hooks/useMutation.types';

export interface ToastOptions<T = any, S = any>
  extends Partial<IdProps>,
    MessageProps {
  mutationArgsOnComplete?: UseMutationArgs<T, S>;
  mutationArgsOnUndo?: UseMutationArgs<T, S>;
  onUndo?: VoidFunction;
}
