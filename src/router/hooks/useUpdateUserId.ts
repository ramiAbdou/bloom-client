import { useEffect } from 'react';
import { userIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useCustomQuery from '@gql/hooks/useCustomQuery';

interface GetUserTokensResult {
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 */
const useUpdateUserId = (): boolean => {
  const storedUserId: string = useReactiveVar(userIdVar);

  const { data, loading } = useCustomQuery<GetUserTokensResult>({
    fields: ['userId'],
    queryName: 'getUserTokens'
  });

  const userId: string = data?.userId;

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (userId) {
      userIdVar(userId);
    }
  }, [userId]);

  return loading || (!!userId && userId !== storedUserId);
};

export default useUpdateUserId;
