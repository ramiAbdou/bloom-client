import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { SetActiveEntitesArgs } from '@db/db.types';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';

interface GetUserTokensResult {
  communityId: string;
  memberId: string;
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 *
 * @param shouldRedirectToLogin - True if the Router should redirect to login if
 * there are no ID's (userId, etc.) present on the token.
 */
const useGetUserTokens = (shouldRedirectToLogin = false): boolean => {
  const setActiveEntities: ActionCreator<
    SetActiveEntitesArgs | SetActiveEntitesArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const token: string = new URLSearchParams(window.location.search).get(
    'token'
  );

  const { urlName }: UrlNameProps = useParams();
  const { push } = useHistory();

  const { data, loading, error } = useCustomQuery<GetUserTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    queryName: 'getUserTokens'
  });

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (data?.userId) {
      setActiveEntities({
        communityId: data.communityId,
        memberId: data.memberId,
        userId: data.userId
      });
    }
  }, [data]);

  // useEffect(() => {
  //   // Otherwise, if shouldRedirectToLogin is true, we redirect to /login!
  //   if (shouldRedirectToLogin && !urlName) push('/login');
  // }, [shouldRedirectToLogin, token, urlName]);

  // We say that it is loading if there is no data and no error OR the
  // fetching is still loading.
  return loading || (!data && !error);
};

export default useGetUserTokens;
