import { useEffect } from 'react';

import Loading from '@store/Loading.store';

/**
 * Updates the current loading state. Ensures that state isn't updated if
 * the loading variable is the same as the current state variable.
 *
 * Precondition: This hook must only be called from a child of the
 * Loading.Provider store.
 */
const useUpdateLoading = (loading: boolean) => {
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);
};

export default useUpdateLoading;
