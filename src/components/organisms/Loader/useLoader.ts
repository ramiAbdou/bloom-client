import { useEffect } from 'react';

import { useStoreActions, useStoreState } from '@store/Store';

const useLoader = (loading: boolean) => {
  const isShowing = useStoreState(({ loader }) => loader.isShowing);
  const closeLoader = useStoreActions(({ loader }) => loader.closeLoader);
  const showLoader = useStoreActions(({ loader }) => loader.showLoader);

  useEffect(() => {
    if (loading && !isShowing) showLoader();
    else if (!loading && isShowing) closeLoader();
  }, [isShowing, loading]);
};

export default useLoader;
