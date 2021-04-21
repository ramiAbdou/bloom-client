import { useEffect } from 'react';
import { userIdVar } from 'src/reactive';

import { useStoreActions, useStoreState } from '@core/store/Store';
import useCustomQuery from '@gql/hooks/useCustomQuery';

interface GetUserTokensResult {
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 */
const useUpdateUserId = (): boolean => {
  const storedUserId: string = useStoreState(({ db }) => db.userId);
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);

  const { data, loading } = useCustomQuery<GetUserTokensResult>({
    fields: ['userId'],
    queryName: 'getUserTokens'
  });

  const userId: string = data?.userId;

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (userId) {
      setActiveEntities({ userId });
      userIdVar(userId);
    }
  }, [userId]);

  return loading || (!!userId && userId !== storedUserId);
};

export default useUpdateUserId;
