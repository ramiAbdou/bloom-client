import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { RouteType } from '@constants';
import { useStoreState } from '@store/Store';

const usePush = (to: RouteType) => {
  const urlName = useStoreState(({ db }) => db.community?.urlName);

  const { push } = useHistory();

  const result = useCallback(() => {
    push(`/${urlName}/${to}`);
  }, [urlName]);

  return result;
};

export default usePush;
