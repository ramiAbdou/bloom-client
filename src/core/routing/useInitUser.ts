import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity, IMember, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): boolean => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const memberId: string = useStoreState(({ db }) => db.member?.id);
  const userId: string = useStoreState(({ db }) => db.user?.id);

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
      'status',
      { community: ['id'] },
      { user: ['id'] }
    ],
    operation: QueryEvent.LIST_MEMBERS,
    schema: [Schema.MEMBER],
    types: { userId: { required: false } }
  });

  const [getCommunities, { loading: loading3 }] = useManualQuery<ICommunity[]>({
    fields: ['id', 'logoUrl', 'primaryColor', 'urlName'],
    operation: QueryEvent.LIST_COMMUNITIES,
    schema: [Schema.COMMUNITY],
    types: { userId: { required: false } }
  });

  const [getMember, { loading: loading4 }] = useManualQuery({
    fields: [
      'bio',
      'email',
      'id',
      'isDuesActive',
      'role',
      'status',
      { community: ['id'] },
      { memberIntegrations: ['id'] },
      { plan: ['id'] },
      { socials: ['id'] },
      { user: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER,
    schema: Schema.MEMBER
  });

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await Promise.all([
          getCommunities({ userId }),
          getMember(),
          getMembers({ userId }),
          getUser()
        ]);
      }
    })();
  }, [isAuthenticated, memberId, userId]);

  const loading: boolean = loading1 || loading2 || loading3 || loading4;

  useLoader(loading);

  return loading;
};

export default useInitUser;
