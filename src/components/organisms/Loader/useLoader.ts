import { useEffect } from 'react';

import { useStoreActions } from '@store/Store';

/**
 * Updates the global loading state to match the loading state of the query
 * calls.
 *
 * @param loading True if the application is loading.
 */
const useLoader = (loading: boolean): void => {
  const closeLoader = useStoreActions(({ loader }) => {
    return loader.closeLoader;
  });

  const showLoader = useStoreActions(({ loader }) => {
    return loader.showLoader;
  });

  useEffect(() => {
    if (loading) showLoader();
    else if (!loading) closeLoader();
  }, [loading]);
};

export default useLoader;
