import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useManualQuery from '@gql/useManualQuery';
import { useStoreActions } from '@store/Store';
import { UrlNameProps } from '@util/constants';
import { QueryEvent } from '@util/constants.events';
import { SetActiveArgs } from '../db/db.types';

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
    SetActiveArgs | SetActiveArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const token: string = new URLSearchParams(window.location.search).get(
    'token'
  );

  const { urlName }: UrlNameProps = useParams();
  const { push } = useHistory();

  const [getUserTokens, result] = useManualQuery<GetUserTokensResult>({
    fields: ['communityId', 'memberId', 'userId'],
    operation: QueryEvent.GET_USER_TOKENS,
    types: { urlName: { required: false } }
  });

  useEffect(() => {
    (async () => {
      const { data } = await getUserTokens({ urlName });

      // If the userId is decoded from the decoded token, then set the active
      // entities for the communities, members and users.
      if (data?.userId) {
        setActiveEntities({
          communityId: data.communityId,
          memberId: data.memberId,
          userId: data.userId
        });

        return;
      }

      // Otherwise, if shouldRedirectToLogin is true, we redirect to /login!
      if (shouldRedirectToLogin && !urlName) push('/login');
    })();
  }, [shouldRedirectToLogin, token, urlName]);

  // We say that it is loading if there is no data and no error OR the
  // fetching is still loading.
  const loading: boolean = (!result.data && !result.error) || result.loading;

  return loading;
};

export default useGetUserTokens;
