import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { RouteType } from '@constants';
import { useStoreState } from '@store/Store';

const usePush = (to: RouteType) => {
  const encodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  const { push } = useHistory();

  const result = useCallback(() => {
    push(`${encodedUrlName}/${to}`);
  }, [encodedUrlName]);

  return result;
};

export default usePush;
