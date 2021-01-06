import { useEffect } from 'react';

import LoadingStore from '@store/Loading.store';

/**
 * Updates the current loading state. Ensures that state isn't updated if
 * the loading variable is the same as the current state variable.
 *
 * Precondition: This hook must only be called from a child of the
 * LoadingStore.Provider store.
 */
const useUpdateLoading = (loading: boolean) => {
  const currentLoading = LoadingStore.useStoreState((store) => store.loading);
  const setLoading = LoadingStore.useStoreActions((store) => store.setLoading);

  useEffect(() => {
    if (loading !== undefined && loading !== currentLoading) {
      setLoading(loading);
    }
  }, [loading]);
};

export default useUpdateLoading;
