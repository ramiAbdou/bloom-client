import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreState } from '@store/Store';
import { RouteType } from '@util/constants';

const usePush = (to: RouteType, path?: string): VoidFunction => {
  const urlName: string = useStoreState(({ db }) => db.community?.urlName);
  const { push } = useHistory();

  const result: VoidFunction = useCallback(() => {
    const url: string = path
      ? `/${urlName}/${to}/${path}`
      : `/${urlName}/${to}`;

    push(url);
  }, [urlName]);

  return result;
};

export default usePush;
