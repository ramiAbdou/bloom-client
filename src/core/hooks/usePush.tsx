import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { RouteType } from '@util/constants';
import { useStoreState } from '@store/Store';

const usePush = (to: RouteType, path?: string) => {
  const urlName = useStoreState(({ db }) => db.community?.urlName);

  const { push } = useHistory();

  const result = useCallback(() => {
    const url = path ? `/${urlName}/${to}/${path}` : `/${urlName}/${to}`;
    push(url);
  }, [urlName]);

  return result;
};

export default usePush;
