import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { SetActiveEntitesArgs } from '@db/db.types';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import { useStoreActions, useStoreState } from '@store/Store';

interface GetUserTokensResult {
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 *
 * @param shouldRedirectToLogin - True if the Router should redirect to login if
 * there are no ID's (userId, etc.) present on the token.
 */
const useUpdateUserId = (): boolean => {
  const storedUserId: string = useStoreState(({ db }) => db.userId);

  const setActiveEntities: ActionCreator<
    SetActiveEntitesArgs | SetActiveEntitesArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const { data, loading } = useCustomQuery<GetUserTokensResult>({
    fields: ['userId'],
    queryName: 'getUserTokens'
  });

  const userId: string = data?.userId;

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (userId) setActiveEntities({ userId });
  }, [userId]);

  return loading || (!!userId && userId !== storedUserId);
};

export default useUpdateUserId;
