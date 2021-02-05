import { useEffect } from 'react';

import { useStoreActions, useStoreState } from '@store/Store';

const useLoader = (loading: boolean) => {
  const isShowing = useStoreState(({ loader }) => loader.isShowing);
  const closeLoader = useStoreActions(({ loader }) => loader.closeLoader);
  const showLoader = useStoreActions(({ loader }) => loader.showLoader);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading && !isShowing) showLoader();
    else {
      timeout = setTimeout(() => {
        if (!loading && isShowing) closeLoader();
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isShowing, loading]);
};

export default useLoader;
