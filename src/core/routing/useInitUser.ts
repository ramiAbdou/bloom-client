import { IUser } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useFindOneFull from '@gql/useFindOneFull';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreState } from '@store/Store';

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): QueryResult<IUser> => {
  const isAuthenticated: boolean = useStoreState(
    ({ db }) => db.isAuthenticated
  );

  const userId: string = useStoreState(({ db }) => db.entities.users.activeId);

  const result: QueryResult<IUser> = useFindOneFull(IUser, {
    fields: [
      'email',
      'id',
      'members.community.id',
      'members.community.logoUrl',
      'members.community.primaryColor',
      'members.community.urlName',
      'members.email',
      'members.firstName',
      'members.lastName',
      'members.id',
      'members.pictureUrl',
      'members.role',
      'members.status'
    ],
    skip: !isAuthenticated,
    where: { id: userId }
  });

  console.log(result);

  useLoader(result.loading);

  return result;
};

export default useInitUser;
