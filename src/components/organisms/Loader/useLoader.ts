import { useEffect } from 'react';
import { isLoaderShowingVar } from 'src/App.reactive';

/**
 * Updates the global loading state to match the loading state of the query
 * calls.
 *
 * @param loading True if the application is loading.
 */
const useLoader = (loading: boolean): void => {
  useEffect(() => {
    if (loading) isLoaderShowingVar(true);
    else if (!loading) isLoaderShowingVar(false);
  }, [loading]);
};

export default useLoader;
