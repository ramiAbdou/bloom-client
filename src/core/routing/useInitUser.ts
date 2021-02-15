import useQuery from '@hooks/useQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

/**
 * Fetches the logged in user including the user's different communities.
 * If there is an error, redirects to the login route.
 *
 * Updates global loading state.
 */
const useInitUser = () => {
  const { loading } = useQuery<IUser>({
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

  useLoader(loading);

  return loading;
};

export default useInitUser;
