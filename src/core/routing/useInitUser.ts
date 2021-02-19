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

  const [getUser, { loading: loading1 }] = useManualQuery<IUser>({
    fields: ['email', 'firstName', 'id', 'lastName', 'pictureUrl'],
    operation: 'getUser',
    schema: Schema.USER
  });

  const [getMembers, { loading: loading2 }] = useManualQuery<IMember[]>({
    fields: [
      'joinedAt',
      'id',
      { community: ['id', 'logoUrl', 'urlName'] },
      { user: ['id'] }
    ],
    operation: 'getMembers',
    schema: [Schema.MEMBER]
  });

  const [getMember, { loading: loading3 }] = useManualQuery({
    fields: [
      'bio',
      'id',
      'isDuesActive',
      'role',
      'status',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] },
      { community: ['id'] },
      { type: ['id'] },
      { user: ['id'] }
    ],
    operation: 'getMember',
    schema: Schema.MEMBER
  });

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await Promise.all([getMembers(), getUser(), getMember()]);
      }
    })();
  }, [isAuthenticated]);

  useLoader(loading1 || loading2 || loading3);

  return loading1 || loading2 || loading3;
};

export default useInitUser;
