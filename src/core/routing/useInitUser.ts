import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IMember, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): boolean => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const [getMembers, { loading: loading1 }] = useManualQuery<IMember[]>({
    fields: [
      'joinedAt',
      'id',
      { community: ['id', 'logoUrl', 'urlName'] },
      { user: ['id'] }
    ],
    operation: 'getMembers',
    schema: [Schema.MEMBER]
  });

  const [getUser, { loading: loading2 }] = useManualQuery<IUser>({
    fields: ['email', 'firstName', 'id', 'lastName', 'pictureUrl'],
    operation: 'getUser',
    schema: Schema.USER
  });

  useEffect(() => {
    (async () => {
      if (isAuthenticated) await Promise.all([getMembers(), getUser()]);
    })();
  }, [isAuthenticated]);

  useLoader(loading1 || loading2);

  return loading1 || loading2;
};

export default useInitUser;
