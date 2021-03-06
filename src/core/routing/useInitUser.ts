import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IMember, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): boolean => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const [getUser, { loading: loading1 }] = useManualQuery<IUser>({
    fields: ['email', 'id'],
    operation: QueryEvent.GET_USER,
    schema: Schema.USER
  });

  const [getMembers, { loading: loading2 }] = useManualQuery<IMember[]>({
    fields: [
      'firstName',
      'lastName',
      'joinedAt',
      'pictureUrl',
      'id',
      'isDuesActive',
      { community: ['id', 'logoUrl', 'primaryColor', 'urlName'] },
      { user: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const [getMember, { loading: loading3 }] = useManualQuery({
    fields: [
      'bio',
      'id',
      'role',
      'status',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] },
      { community: ['id'] },
      { plan: ['id'] },
      { user: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER,
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
