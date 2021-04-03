import { useEffect } from 'react';

import useHasuraLazyQuery from '@hooks/useHasuraLazyQuery';
import { QueryResult } from '@hooks/useQuery.types';
import useLoader from '@organisms/Loader/useLoader';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): QueryResult<IUser[]> => {
  const isAuthenticated: boolean = useStoreState(
    ({ db }) => db.isAuthenticated
  );

  const userId: string = useStoreState(({ db }) => db.entities.users.activeId);

  const [getUser, result] = useHasuraLazyQuery<IUser[]>({
    fields: [
      'email',
      'id',
      'members.bio',
      'members.community.id',
      'members.community.logoUrl',
      'members.community.primaryColor',
      'members.community.urlName',
      'members.email',
      'members.firstName',
      'members.lastName',
      'members.joinedAt',
      'members.memberIntegrations.id',
      'members.memberSocials.id',
      'members.memberType.id',
      'members.id',
      'members.pictureUrl',
      'members.role',
      'members.status',
      'members.user.id'
    ],
    operation: 'users',
    queryName: 'GetUserById',
    schema: [Schema.USER],
    variables: { userId: { type: 'String!', value: userId } },
    where: { id: { _eq: '$userId' } }
  });

  useEffect(() => {
    if (isAuthenticated) getUser();
  }, [isAuthenticated]);

  useLoader(result.loading);

  return result;
};

export default useInitUser;
