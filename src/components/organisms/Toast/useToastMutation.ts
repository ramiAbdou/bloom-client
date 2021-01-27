import { useEffect } from 'react';

import useMutation from '@hooks/useMutation';
import { useStoreActions } from '@store/Store';
import { ToastOptions } from './Toast.types';

interface UseMutationOnCompleteArgs
  extends Pick<
    ToastOptions,
    'id' | 'mutationArgsOnComplete' | 'mutationArgsOnUndo'
  > {
  wasUndid: boolean;
}

/**
 * Returns the mutationOnUndoFn based on the mutationArgsOnUndo args.
 *
 * Also controls the mutationOnCompleteFn based on the mutationArgsOnComplete
 * args. If they exist and the toast hasn't been undone, then it executes
 * in the cleanup function. Otherwise, it doens't run.
 */
const useToastMutation = ({
  id,
  mutationArgsOnComplete,
  mutationArgsOnUndo,
  wasUndid
}: UseMutationOnCompleteArgs) => {
  const dequeueToast = useStoreActions(({ toast }) => toast.dequeueToast);

  const [mutationOnCompleteFn] = useMutation(
    mutationArgsOnComplete ?? { name: null, query: '' }
  );

  const [mutationOnUndoFn] = useMutation(
    mutationArgsOnUndo ?? { name: null, query: '' }
  );

  useEffect(() => {
    // We only show the toast for 5 seconds, then we remove it from the DOM.
    const timeout = setTimeout(async () => {
      if (mutationArgsOnComplete) await mutationOnCompleteFn();
      dequeueToast(id);
    }, 5000);

    return () => {
      // If the Toast was already undid, then in this cleanup function, we
      // clear the timeout that would've executed the mutation and removed
      // the toast.
      if (wasUndid) clearTimeout(timeout);
    };
  }, [wasUndid]);

  return { mutationOnUndoFn };
};

export default useToastMutation;
