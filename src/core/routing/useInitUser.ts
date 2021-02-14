import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';

/**
 * Fetches the logged in user including the user's different communities.
 * If there is an error, redirects to the login route.
 *
 * Updates global loading state.
 */
const useInitUser = () => {
  const setActive = useStoreActions(({ db }) => db.setActive);

  const { push } = useHistory();

  const { loading, data, error } = useQuery<IUser>({
    fields: [
      'email',
      'firstName',
      'id',
      'lastName',
      'pictureUrl',
      {
        members: ['joinedAt', 'id', { community: ['id', 'logoUrl', 'urlName'] }]
      }
    ],
    operation: 'getUser',
    schema: Schema.USER,
    types: { populate: { required: false, type: '[String!]' } },
    variables: { populate: ['members.community'] }
  });

  useEffect(() => {
    if (data) setActive({ id: data.id, table: 'users' });
  }, [data]);

  useEffect(() => {
    if (error) push('/login');
  }, [error]);

  useLoader(loading);

  return loading;
};

export default useInitUser;
