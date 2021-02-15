import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';

interface GetTokensResult {
  communityId: string;
  memberId: string;
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the httpOnly
 * cookies stored in the browser.
 */
const useInitUser = (): boolean => {
  const { urlName }: UrlNameProps = useParams();

  const setActive = useStoreActions(({ db }) => db.setActive);

  const [getTokens, { loading: loading1 }] = useManualQuery<GetTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    operation: 'getTokens',
    types: { urlName: { required: false } }
  });

  const [getUser, { loading: loading2 }] = useManualQuery<IUser>({
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
    (async () => {
      const { data } = await getTokens({ urlName });

      if (!data?.userId) return;

      setActive({ id: data?.communityId, table: 'communities' });
      setActive({ id: data?.memberId, table: 'members' });
      setActive({ id: data?.userId, table: 'users' });

      await getUser();
    })();
  }, [urlName]);

  const loading = loading1 || loading2;

  useLoader(loading);

  return loading;
};

export default useInitUser;
