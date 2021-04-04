import { useEffect } from 'react';

import { QueryResult } from '@gql/gql.types';
import useLazyQuery from '@gql/useLazyQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IUser } from '@db/Db.entities';
import { Schema } from '@db/Db.schema';
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

  const [getUser, result] = useLazyQuery<IUser[]>({
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
    schema: [Schema.USER],
    where: { id: userId }
  });

  useEffect(() => {
    if (isAuthenticated) getUser();
  }, [isAuthenticated]);

  useLoader(result.loading);

  return result;
};

export default useInitUser;
