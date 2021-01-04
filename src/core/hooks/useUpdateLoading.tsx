import { useEffect } from 'react';

import Loading from '@store/Loading.store';

const useUpdateLoading = (loading: boolean) => {
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== null && loading !== currentLoading) setLoading(loading);
  }, [loading]);
};

export default useUpdateLoading;
